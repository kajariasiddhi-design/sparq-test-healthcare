/**
 * AI API CONNECTOR
 * 
 * WHAT THIS FILE DOES:
 * - This is the "Postman" that sends messages to Google Gemini (AI).
 * - It handles different types of AI requests, like analyzing text or interpreting audio.
 * - It makes sure the AI gets the right instructions to give back useful results.
 */

import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { UploadedImage } from '../types';
import { GEMINI_API_KEY } from '../constants';

export const urlToUploadedImage = async (url: string, index: number): Promise<UploadedImage | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch image from ${url}. Status: ${response.status}`);
            return null;
        }
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                if (dataUrl) {
                    resolve({
                        fileName: `loaded_image_${index + 1}.${blob.type.split('/')[1] || 'jpg'}`,
                        mimeType: blob.type,
                        data: dataUrl,
                    });
                } else {
                    reject(new Error('FileReader did not return a result.'));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Error fetching or processing image from ${url}:`, error);
        return null;
    }
};

export const callGemini3 = async (prompt: string, apiKey: string): Promise<string> => {
    const GEMINI_3_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent";
    const GEMINI_2_5_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const makeRequest = async (url: string) => {
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Gemini API Error (${response.status}):`, errorBody);
            throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    };

    try {
        return await makeRequest(GEMINI_3_URL);
    } catch (error) {
        console.warn("Gemini 3 failed, falling back to Gemini 2.5", error);
        return await makeRequest(GEMINI_2_5_URL);
    }
};

export const callGeminiFlashLite = async (prompt: string, apiKey: string): Promise<string> => {
    const GEMINI_FLASH_LITE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

    const response = await fetch(`${GEMINI_FLASH_LITE_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
};

export const callGemini3Image = async (prompt: string, apiKey: string): Promise<string> => {
    const GEMINI_3_IMAGE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";
    const response = await fetch(`${GEMINI_3_IMAGE_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseModalities: ["IMAGE"]
            }
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini Image API Error:", errorText);
        throw new Error(`Image generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const base64Data = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;

    if (!base64Data) {
        console.error("Gemini Image API Response:", data);
        throw new Error("No image data found in response");
    }

    return `data:image/jpeg;base64,${base64Data}`;
};

export const callOpenRouterImage = async (
    prompt: string,
    apiKey: string,
    options: { model?: string; referenceImages?: string[]; aspectRatio?: string; reasoningEffort?: 'low' | 'medium' | 'high' } = {},
): Promise<string> => {
    const model = options.model || 'google/gemini-3-pro-image-preview';
    const references = options.referenceImages || [];
    // With reference images the message carries the prompt and each image (as data URLs)
    const content = references.length > 0
        ? [{ type: 'text', text: prompt }, ...references.map(url => ({ type: 'image_url', image_url: { url } }))]
        : prompt;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    "role": "user",
                    content
                }
            ],
            modalities: ['image', 'text'],
            ...(options.aspectRatio ? { image_config: { aspect_ratio: options.aspectRatio } } : {}),
            ...(options.reasoningEffort ? { reasoning: { effort: options.reasoningEffort } } : {}),
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter Image API failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    const message = result.choices?.[0]?.message;
    if (message?.images?.length) {
        return message.images[0].image_url.url;
    }

    // Say what came back instead, e.g. a text answer or a refusal
    const reply = typeof message?.content === 'string' ? message.content.trim().slice(0, 300) : '';
    const reason = result.choices?.[0]?.error?.message || result.error?.message || result.choices?.[0]?.finish_reason || '';
    throw new Error(`No image in the response${reason ? ` (${reason})` : ''}${reply ? `. The model replied: "${reply}"` : ''}`);
};

export const callGeminiAudio = async (prompt: string, base64Audio: string, apiKey: string): Promise<string> => {
    const MODEL_NAME = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    { inline_data: { mime_type: "audio/webm", data: base64Audio } }
                ]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini Audio API failed: ${response.status}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) throw new Error("No response from Gemini");
    return textResponse;
};
