/**
 * AD CREATIVE COMPONENT
 * 
 * WHAT THIS FILE DOES:
 * - Displays the final "Ad Pillars" and generated storylines.
 * - Allows users to see different versions of a story, translate them, or even generate a sketch image.
 * - This is where the creative output of the brand is showcased.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdPillar, Story, Language, Frame, UploadedImage } from '../types';
import { MoodBoardImage, MAX_REFERENCE_IMAGES, prepareReferenceImage } from '../utils/moodBoard';
import { translations } from '../data/translations'; import { addTranslations } from '../data/translation-utils';
import { AccessLevel, ACCESS_LEVELS } from '../constants';
import { TextArea, TextInput, TranslatedText, Label } from './FormElements.tsx';
import { StoryboardConcept, suggestConceptTitle } from '../utils/storyboardDeck';

interface AdCreativeProps {
    adPillars: AdPillar[];
    lang: Language;
    handleGenerateStories: (pIdx: number) => void;
    handlePillarEditToggle: (pIdx: number, isEditing: boolean) => void;
    handlePillarFieldChange: (pIdx: number, field: keyof AdPillar, value: string | string[]) => void;
    handleSavePillar: (pIdx: number) => void;
    handleStoryEditToggle: (pIdx: number, sIdx: number, isEditing: boolean) => void;
    handleSaveStory: (pIdx: number, sIdx: number) => void;
    handleUpdateStory: (pIdx: number, sIdx: number, changes: string) => void;
    handleNavigateVersion: (pIdx: number, sIdx: number, direction: 'prev' | 'next') => void;
    handleToggleViewOriginal: (pIdx: number, sIdx: number) => void;
    handleToggleStorySelection: (pIdx: number, sIdx: number) => void;
    onCancel: () => void;
    onShare: (title: string, text: string, imageUrl?: string) => void;
    onExportToPdf: (pillar: AdPillar) => void;
    openImageViewer: (url: string) => void;
    viewingOriginalStory: Story | null;
    setViewingOriginalStory: (story: Story | null) => void;
    onFreestyleStory?: (pIdx: number, prompt: string) => void;
    handleRecommendPillars: () => void;
    isAnalyzingPillars: boolean;
    handleClearRecommendations: () => void;
    handleTranslateStory: (pIdx: number, sIdx: number, lang: string) => void;
    handleTranscribeAudio: (audioBlob: Blob) => Promise<string>;
    handleSaveSelectedPillars: (indices: number[]) => Promise<void>;
    isSavingPillars?: boolean;
    pillarSaveSuccess?: boolean;
    accessLevel: AccessLevel;
    onDownloadStoryboard?: (concepts: StoryboardConcept[]) => Promise<void>;
    onGenerateMoodBoard?: (request: { conceptTitle: string; story: Story; references: UploadedImage[] }) => Promise<MoodBoardImage>;
}

/** A story picked for the storyboard deck. Any two stories, from the same pillar or different ones. */
interface StoryboardPick {
    pIdx: number;
    sIdx: number;
    title: string;
}

/** The version of a story the user is looking at: the original, an older version, or the latest. */
const getDisplayedStory = (story: Story): Story => {
    if (story.isViewingOriginal && story.originalStory) return story.originalStory;
    if (story.currentVersionIndex !== undefined && story.currentVersionIndex !== -1 && story.versions?.[story.currentVersionIndex]) {
        return story.versions[story.currentVersionIndex];
    }
    return story;
};

const INDIAN_LANGUAGES = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Malayalam", "Odia"
];

const DetailCard: React.FC<{ label: string, value?: string, children?: React.ReactNode }> = ({ label, value, children }) => {
    if (!value && !children) return null;
    return (
        <div>
            <strong className="block font-semibold text-slate-800">{label}:</strong>
            {value && <p className="mt-1">{value}</p>}
            {children}
        </div>
    );
};

const Storyboard: React.FC<{
    story: Story;
    onCopy: (story: Story) => void;
    copied: boolean;
    onFieldChange: (sIdx: number, field: keyof Story, value: string) => void;
    sIdx: number;
    pIdx: number;
    onViewOriginal?: () => void;
    isViewingOriginal?: boolean;
    hasOriginal?: boolean;
}> = ({ story, onCopy, copied, onFieldChange, sIdx, pIdx, onViewOriginal, isViewingOriginal, hasOriginal }) => {
    const storyTitle = story.title || story.genre || "Untitled Story";

    // Handle frames: they may be objects or raw strings
    const renderFrames = () => {
        if (story.story) {
            return (
                <div className="p-4 bg-slate-50 border rounded-lg">
                    {story.isEditing ? (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Story Narrative</label>
                            <TextArea
                                value={story.story}
                                onChange={(val) => onFieldChange(sIdx, 'story', val)}
                                placeholder="Edit story..."
                                rows={8}
                            />
                        </div>
                    ) : (
                        <p className="text-slate-800 leading-relaxed text-base whitespace-pre-line">{story.story}</p>
                    )}
                </div>
            );
        }

        if (!story.frames || story.frames.length === 0) return null;

        // Check if frames are strings
        if (typeof story.frames[0] === 'string') {
            return (
                <div className="space-y-2">
                    {(story.frames as unknown as string[]).map((frameStr, idx) => (
                        <div key={idx} className="p-3 border rounded-lg bg-slate-50">
                            {story.isEditing ? (
                                <TextArea
                                    value={frameStr}
                                    onChange={(val) => {
                                        const newFrames = [...(story.frames as unknown as string[])];
                                        newFrames[idx] = val;
                                        onFieldChange(sIdx, 'frames', newFrames as any);
                                    }}
                                    rows={2}
                                />
                            ) : (
                                <p className="text-sm text-slate-700">{frameStr}</p>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        // Otherwise assume Frame objects
        return (
            <div className="space-y-2">
                {story.frames.map((frame: Frame, fIdx: number) => (
                    <div key={fIdx} className="p-3 border rounded-lg bg-slate-50">
                        <div className="flex justify-between items-start mb-2">
                            <p className="font-bold text-slate-800">
                                {frame.frame_no ? `Frame ${frame.frame_no}` : ''}
                                {frame.beat ? ` (${frame.beat})` : ''}
                            </p>
                        </div>
                        {story.isEditing ? (
                            <TextArea
                                value={frame.scene || frame.visual_action || ''}
                                onChange={(val) => {
                                    const newFrames = [...story.frames!];
                                    newFrames[fIdx] = { ...newFrames[fIdx], scene: val, visual_action: val };
                                    onFieldChange(sIdx, 'frames', newFrames as any);
                                }}
                                rows={2}
                            />
                        ) : (
                            <p className="mt-1 text-sm text-slate-700">
                                {frame.scene || frame.visual_action || 'No description.'}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start gap-2">
                <h4 className="text-lg font-semibold text-slate-900 flex-grow">{storyTitle}</h4>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    {hasOriginal && onViewOriginal && (
                        <button
                            onClick={onViewOriginal}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${isViewingOriginal
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 shadow-sm border border-indigo-200'
                                }`}
                        >
                            {isViewingOriginal ? 'Back to Update' : 'View Original'}
                        </button>
                    )}
                    <button onClick={() => onCopy(story)} className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-bold rounded-md hover:bg-slate-300 w-20 text-center">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border text-sm text-slate-700 space-y-3">
                {story.isEditing ? (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Overview</label>
                        <TextArea
                            value={story.overview || ''}
                            onChange={(val) => onFieldChange(sIdx, 'overview', val)}
                            placeholder="Overview"
                        />
                    </div>
                ) : (
                    <DetailCard label="Overview" value={story.overview} />
                )}
            </div>

            {renderFrames()}

            <div className="p-4 bg-slate-50 rounded-lg border text-sm text-slate-700 space-y-3">
                {story.isEditing ? (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Ending Moment</label>
                            <TextArea
                                value={story.ending_moment || ''}
                                onChange={(val) => onFieldChange(sIdx, 'ending_moment', val)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Tagline</label>
                            <TextArea
                                value={story.tagline || ''}
                                onChange={(val) => onFieldChange(sIdx, 'tagline', val)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <DetailCard label="Ending Moment" value={story.ending_moment} />
                        <DetailCard label="Tagline" value={story.tagline} />
                    </>
                )}
            </div>
        </div>
    );
};

const AdCreative: React.FC<AdCreativeProps> = ({
    adPillars, lang, handleGenerateStories,
    handlePillarEditToggle, handlePillarFieldChange, handleSavePillar,
    handleStoryEditToggle, handleStoryFieldChange, handleSaveStory,
    handleUpdateStory,
    handleNavigateVersion,
    handleToggleViewOriginal,
    handleToggleStorySelection,
    onCancel, onShare, onExportToPdf,
    openImageViewer, viewingOriginalStory, setViewingOriginalStory,
    onFreestyleStory, handleRecommendPillars, isAnalyzingPillars, handleClearRecommendations,
    handleTranslateStory, handleTranscribeAudio, handleSaveSelectedPillars,
    isSavingPillars, pillarSaveSuccess,
    accessLevel, onDownloadStoryboard, onGenerateMoodBoard
}) => {
    const [activeStoryTab, setActiveStoryTab] = useState<number | null>(null);
    const [storyboardPicks, setStoryboardPicks] = useState<StoryboardPick[]>([]);
    const [storyboardNotice, setStoryboardNotice] = useState<string | null>(null);
    const [isBuildingDeck, setIsBuildingDeck] = useState(false);
    // Mood boards by story ("pIdx-sIdx"), so removing and re-adding a story keeps its image
    const [moodBoards, setMoodBoards] = useState<Record<string, MoodBoardImage>>({});
    const [moodBoardStatus, setMoodBoardStatus] = useState<Record<string, { loading?: boolean; error?: string }>>({});
    // Pictures and logos for the mood boards, uploaded here at the storyboard stage
    const [moodBoardRefs, setMoodBoardRefs] = useState<{ id: string; image: UploadedImage }[]>([]);
    const [refUploadError, setRefUploadError] = useState<string | null>(null);

    // New pillars mean new stories, so earlier picks and mood boards no longer apply
    const pillarNamesKey = adPillars.map(p => p.pillar_name || p.pillar_id || p.name || '').join('|');
    useEffect(() => {
        setStoryboardPicks([]);
        setStoryboardNotice(null);
        setMoodBoards({});
        setMoodBoardStatus({});
    }, [pillarNamesKey]);
    const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
    const [updateRequests, setUpdateRequests] = useState<Record<string, string>>({});
    const [isRecording, setIsRecording] = useState<string | null>(null); // storyId of currently recording story
    const [transcribingStoryId, setTranscribingStoryId] = useState<string | null>(null);
    const [selectedPillarIndices, setSelectedPillarIndices] = useState<Set<number>>(new Set());
    const [isPillarBlurDismissed, setIsPillarBlurDismissed] = useState(false);

    // Synchronize selection state with props (for loading from persistence)
    useEffect(() => {
        if (adPillars && adPillars.length > 0) {
            const initialSelected = new Set<number>();
            adPillars.forEach((p, idx) => {
                if (p.isSelected) {
                    initialSelected.add(idx);
                }
            });
            setSelectedPillarIndices(initialSelected);
        }
    }, [adPillars]);

    // Reset blur dismissal when analysis starts
    useEffect(() => {
        if (isAnalyzingPillars) {
            setIsPillarBlurDismissed(false);
        }
    }, [isAnalyzingPillars]);

    // ... Refs ...
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const togglePillarSelection = (index: number) => {
        setSelectedPillarIndices(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };


    // Custom Story Modal State
    const [isCustomStoryModalOpen, setIsCustomStoryModalOpen] = useState(false);
    const [customStoryPillarIndex, setCustomStoryPillarIndex] = useState<number | null>(null);
    const [customStoryPrompt, setCustomStoryPrompt] = useState("");

    const handleCopy = (textToCopy: string, id: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopiedItemId(id);
            setTimeout(() => setCopiedItemId(null), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleCopyPillar = (pillar: AdPillar, index: number) => {
        let textToCopy = '';
        if (pillar.pillar_id) { // New format
            textToCopy = `Pillar: ${pillar.pillar_id}\n\n` +
                `Hook World Snapshot:\n${pillar.hook_world_snapshot || 'N/A'}\n\n` +
                `Functional Problem Source:\n${pillar.functional_problem_source || 'N/A'}\n\n` +
                `Life Problem:\n${pillar.life_problem || pillar.lifestyle_problem || 'N/A'}`;
        } else { // Old format
            textToCopy = `Pillar: ${pillar.name || 'N/A'}\n\n` +
                `Why it Matters:\n${pillar.why_it_matters || 'N/A'}\n\n` +
                `Suggested Genres: ${(pillar.genres || []).join(', ')}\n` +
                `Suggested Settings: ${(pillar.settings || []).join(', ')}`;
        }
        handleCopy(textToCopy, `pillar-${index}`);
    };

    const handleCopyStory = (story: Story, pIdx: number, sIdx: number) => {
        let textToCopy = '';
        const storyId = `story-${pIdx}-${sIdx}`;

        if (story.story) {
            textToCopy += `Pillar: ${story.pillar_id || 'N/A'}\n`;
            textToCopy += `Genre: ${story.genre || 'N/A'}\n`;
            if (story.overview) textToCopy += `Overview: ${story.overview}\n\n`;

            textToCopy += `Story:\n${story.story}\n\n`;

            textToCopy += `Ending Moment: ${story.ending_moment || 'N/A'}\n`;
            textToCopy += `Tagline: ${story.tagline || 'N/A'}\n`;
        } else if (story.frames && (story.logline || story.overview)) { // New Storyboard Format
            textToCopy += `Pillar: ${story.pillar_id || 'N/A'}\n`;
            textToCopy += `Genre: ${story.genre || 'N/A'}\n`;
            if (story.logline) textToCopy += `Logline: ${story.logline}\n`;
            textToCopy += `\nOverview:\n${story.overview || 'N/A'}\n\n`;

            textToCopy += 'Frames:\n';
            story.frames?.forEach(frame => {
                const frameDescription = `Frame ${frame.frame_no || '?'}${frame.beat ? ` (${frame.beat})` : ''}: ${frame.scene || frame.visual_action || 'N/A'}`;
                textToCopy += `${frameDescription}\n`;
            });

            textToCopy += `\nEnding Moment: ${story.ending_moment || 'N/A'}\n`;
            textToCopy += `Tagline: ${story.tagline || 'N/A'}\n`;
        } else { // Old Format
            textToCopy = `Title: ${story.title || 'N/A'}\n` +
                `Genre: ${story.genre || 'N/A'}\n` +
                `Setting: ${story.setting || 'N/A'}\n\n` +
                `Storyline:\n${story.storyline || 'N/A'}\n\n` +
                `Signature Device:\n${story.signature_device || 'N/A'}`;
        }

        handleCopy(textToCopy, storyId);
    };

    const handleSubmitUpdate = (pIdx: number, sIdx: number) => {
        const storyId = `story-${pIdx}-${sIdx}`;
        const changes = updateRequests[storyId];
        if (!changes || !changes.trim() || adPillars[pIdx]?.stories?.[sIdx]?.isUpdating) return;

        handleUpdateStory(pIdx, sIdx, changes);
        setUpdateRequests(prev => ({ ...prev, [storyId]: '' }));
    };

    const openCustomStoryModal = (pIdx: number) => {
        setCustomStoryPillarIndex(pIdx);
        setCustomStoryPrompt("");
        setIsCustomStoryModalOpen(true);
    };

    const submitCustomStory = () => {
        if (customStoryPillarIndex !== null && customStoryPrompt && onFreestyleStory) {
            setActiveStoryTab(customStoryPillarIndex);
            onFreestyleStory(customStoryPillarIndex, customStoryPrompt);
            setIsCustomStoryModalOpen(false);
        }
    };

    const startRecording = async (pIdx: number, sIdx: number) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setIsRecording(null); // Stop UI recording state immediately
                stream.getTracks().forEach(track => track.stop());

                const storyId = `story-${pIdx}-${sIdx}`;
                setTranscribingStoryId(storyId);

                try {
                    const text = await handleTranscribeAudio(audioBlob);
                    setUpdateRequests(prev => ({ ...prev, [storyId]: text }));
                } catch (e) {
                    console.error("Transcription failed", e);
                } finally {
                    setTranscribingStoryId(null);
                }
            };

            mediaRecorder.start();
            setIsRecording(`story-${pIdx}-${sIdx}`);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please ensure permissions are granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };

    // Collect all stories
    const pillarLabel = (p?: AdPillar) => (p && (p.pillar_name || p.pillar_id || p.name || p.maslow_level)) || 'Untitled Pillar';
    const allStories = adPillars.flatMap((p, pIdx) => (p.stories || []).map((s, sIdx) => ({ ...s, pIdx, sIdx, pillarName: pillarLabel(p) })));

    // One tab per pillar that has stories (or is generating them)
    const storyTabs = adPillars
        .map((p, pIdx) => ({ pIdx, name: pillarLabel(p), count: p.stories?.length || 0, isGenerating: !!p.isGeneratingStories }))
        .filter(t => t.count > 0 || t.isGenerating);
    const currentTab = storyTabs.some(t => t.pIdx === activeStoryTab) ? activeStoryTab : (storyTabs[0]?.pIdx ?? null);
    const tabStories = allStories.filter(s => s.pIdx === currentTab);

    // Storyboard picks whose story still exists, in concept order
    const picks = storyboardPicks.filter(pk => adPillars[pk.pIdx]?.stories?.[pk.sIdx]);
    const pickIndexOf = (pIdx: number, sIdx: number) => picks.findIndex(pk => pk.pIdx === pIdx && pk.sIdx === sIdx);

    const toggleStoryboardPick = (pIdx: number, sIdx: number) => {
        setStoryboardNotice(null);
        if (pickIndexOf(pIdx, sIdx) !== -1) {
            setStoryboardPicks(picks.filter(pk => !(pk.pIdx === pIdx && pk.sIdx === sIdx)));
            return;
        }
        const story = adPillars[pIdx]?.stories?.[sIdx];
        if (!story) return;
        const pick = { pIdx, sIdx, title: suggestConceptTitle(getDisplayedStory(story), pillarLabel(adPillars[pIdx])) };
        if (picks.length < 2) {
            setStoryboardPicks([...picks, pick]);
        } else {
            setStoryboardNotice('The storyboard already has two stories. Remove one before adding another.');
        }
    };

    const updatePickTitle = (index: number, title: string) =>
        setStoryboardPicks(picks.map((pk, i) => (i === index ? { ...pk, title } : pk)));

    const moodBoardKey = (pk: { pIdx: number; sIdx: number }) => `${pk.pIdx}-${pk.sIdx}`;
    const isAnyMoodBoardLoading = picks.some(pk => moodBoardStatus[moodBoardKey(pk)]?.loading);

    const handleGenerateMoodBoard = async (pk: StoryboardPick) => {
        if (!onGenerateMoodBoard) return;
        const key = moodBoardKey(pk);
        setMoodBoardStatus(prev => ({ ...prev, [key]: { loading: true } }));
        try {
            const story = getDisplayedStory(adPillars[pk.pIdx].stories![pk.sIdx]);
            const image = await onGenerateMoodBoard({
                conceptTitle: pk.title.trim() || suggestConceptTitle(story, pillarLabel(adPillars[pk.pIdx])),
                story,
                references: moodBoardRefs.map(r => r.image),
            });
            setMoodBoards(prev => ({ ...prev, [key]: image }));
            setMoodBoardStatus(prev => ({ ...prev, [key]: {} }));
        } catch (err) {
            console.error('Mood board failed', err);
            const message = (err as Error)?.message || '';
            setMoodBoardStatus(prev => ({
                ...prev,
                [key]: { error: /(429|503)|busy|overloaded|rate/i.test(message)
                    ? 'The image service is busy right now. Please try again in a minute.'
                    : 'Could not create the mood board.' },
            }));
        }
    };

    // Picked stories that still need a mood board; "Create mood boards" makes them all at once
    const picksNeedingMoodBoard = picks.filter(pk => !moodBoards[moodBoardKey(pk)]);
    const handleCreateMoodBoards = () => {
        picksNeedingMoodBoard
            .filter(pk => !moodBoardStatus[moodBoardKey(pk)]?.loading)
            .forEach(pk => { handleGenerateMoodBoard(pk); });
    };

    const handleReferenceUpload = async (files: FileList | null) => {
        if (!files?.length) return;
        setRefUploadError(null);
        const room = MAX_REFERENCE_IMAGES - moodBoardRefs.length;
        const chosen = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, Math.max(0, room));
        if (files.length > chosen.length) {
            setRefUploadError(room <= 0
                ? `You can add up to ${MAX_REFERENCE_IMAGES} pictures. Remove one to add another.`
                : `Only images can be added, up to ${MAX_REFERENCE_IMAGES} in all.`);
        }
        const added: { id: string; image: UploadedImage }[] = [];
        for (const file of chosen) {
            try {
                const image = await prepareReferenceImage(file);
                added.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, image });
            } catch (err) {
                setRefUploadError((err as Error).message);
            }
        }
        setMoodBoardRefs(prev => [...prev, ...added].slice(0, MAX_REFERENCE_IMAGES));
    };

    const handleDownloadStoryboard = async () => {
        if (!onDownloadStoryboard || picks.length !== 2) return;
        setIsBuildingDeck(true);
        setStoryboardNotice(null);
        try {
            await onDownloadStoryboard(picks.map(pk => ({
                title: pk.title.trim() || suggestConceptTitle(getDisplayedStory(adPillars[pk.pIdx].stories![pk.sIdx])),
                pillarName: pillarLabel(adPillars[pk.pIdx]),
                story: getDisplayedStory(adPillars[pk.pIdx].stories![pk.sIdx]),
                moodBoard: moodBoards[moodBoardKey(pk)] || null,
            })));
        } catch (err) {
            console.error('Storyboard deck failed', err);
            const message = (err as Error)?.message || '';
            setStoryboardNotice(/load image|fetch|import/i.test(message)
                ? 'Could not load the deck images. Check that the app is still running, refresh the page and try again.'
                : 'Could not create the deck. Please try again.');
        } finally {
            setIsBuildingDeck(false);
        }
    };

    return (
        <>
            {/* Functional Problem - Displayed once at the top */}
            {adPillars.length > 0 && adPillars[0].functional_problem_source && (
                <div className="mb-6 mt-6">
                    <h2 className="text-xl font-bold text-slate-800 uppercase mb-2">Functional Problem</h2>
                    <p className="text-slate-700 text-base font-medium">{adPillars[0].functional_problem_source}</p>
                </div>
            )}

            <div className="flex flex-col gap-4 mb-10">
                <div className="flex gap-3 w-full">
                    <button
                        onClick={handleClearRecommendations}
                        className="flex-1 h-[52px] px-4 border-2 border-slate-200 text-[13px] font-black rounded-xl text-slate-500 bg-white hover:bg-slate-50 transition-colors uppercase tracking-wider shadow-sm"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleRecommendPillars}
                        disabled={isAnalyzingPillars}
                        className="flex-[2] h-[52px] px-4 border-2 border-emerald-700 text-[13px] font-black rounded-xl text-emerald-700 bg-white hover:bg-emerald-50 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 transition-colors flex items-center justify-center uppercase tracking-wider shadow-sm"
                    >
                        {isAnalyzingPillars ? (
                            <>
                                <div className="loader mr-2 border-emerald-700 border-t-transparent w-4 h-4"></div>
                                Analyzing...
                            </>
                        ) : (
                            "Analyze Pillars"
                        )}
                    </button>
                </div>

                {selectedPillarIndices.size > 0 && (
                    <div className="flex items-center gap-3 w-full animate-in slide-in-from-bottom-2">
                        <button
                            onClick={() => handleSaveSelectedPillars(Array.from(selectedPillarIndices))}
                            disabled={isSavingPillars}
                            className="flex-1 h-[52px] px-8 bg-emerald-700 text-white font-black rounded-xl shadow-lg hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-wider text-[13px] transform active:scale-[0.98]"
                        >
                            {isSavingPillars ? (
                                <div className="loader border-white border-t-transparent w-5 h-5"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                            )}
                            {isSavingPillars ? 'Saving...' : 'Save Selected'}
                        </button>
                        {pillarSaveSuccess && (
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 shadow-sm animate-bounce whitespace-nowrap uppercase tracking-tighter">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Saved!
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="relative">
                {isAnalyzingPillars && !isPillarBlurDismissed && (
                    <div className="absolute inset-x-0 inset-y-0 z-40 bg-white/40 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border-2 border-emerald-100/50 shadow-inner">
                        <button
                            onClick={() => setIsPillarBlurDismissed(true)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white shadow-md rounded-full transition-colors z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border border-emerald-50">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-emerald-100 rounded-full animate-pulse"></div>
                                <div className="absolute inset-0 border-t-4 border-emerald-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Brand Pillars</h3>
                                <p className="text-slate-600 max-w-[300px] leading-relaxed">
                                    Our AI is identifying the most powerful narrative angles for your brand...
                                </p>
                            </div>
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isAnalyzingPillars && !isPillarBlurDismissed ? 'pointer-events-none' : ''}`}>
                    {adPillars.slice(0, 4).map((pillar, pIdx) => {
                        const hasRecommendations = adPillars.some(p => p.recommended);
                        const isRecommended = pillar.recommended;

                        return (
                            <div
                                key={pIdx}
                                className={`p-6 rounded-xl shadow-md flex flex-col min-h-[340px] transition-all duration-300 ${isRecommended
                                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 ring-2 ring-emerald-500 shadow-lg transform scale-[1.02]'
                                    : hasRecommendations
                                        ? 'bg-slate-50 opacity-60 hover:opacity-80'
                                        : 'bg-slate-50 hover:shadow-lg'
                                    }`}
                            >

                                {pillar.isEditing ? (
                                    // EDITING VIEW
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-slate-800">{pillar.pillar_name || pillar.pillar_id || pillar.name || pillar.maslow_level}</h3>
                                        <div>
                                            <Label lang={lang} text={addTranslations("Hook World Snapshot", "हुक वर्ल्ड स्नैपशॉट", "ஹூக் வேர்ல்ட் ஸ்னாப்ஷாட்", "హుక్ వరల్డ్ స్నాప్‌షాట్", "હૂક વર્લ્ડ સ્નેપશોટ")} />
                                            <TextArea value={pillar.hook_world_snapshot || ''} onChange={v => handlePillarFieldChange(pIdx, 'hook_world_snapshot', v)} lang={lang} placeholder={addTranslations('Describe the hook...', 'हुक का वर्णन करें...', 'ஹூக்கை விவரிக்கவும்...', 'హుక్‌ను వివరించండి...', 'હૂકનું વર્ણન કરો...')} rows={3} />
                                        </div>
                                        <div>
                                            <Label lang={lang} text={addTranslations("Functional Problem Source", "कार्यात्मक समस्या स्रोत", "செயல்பாட்டு சிக்கல் ஆதாரம்", "ఫంక్షనల్ ప్రాబ్లమ్ సోర్స్", "કાર્યાત્મક સમસ્યા સ્રોત")} />
                                            <TextArea value={pillar.functional_problem_source || ''} onChange={v => handlePillarFieldChange(pIdx, 'functional_problem_source', v)} lang={lang} placeholder={addTranslations('Describe the functional problem...', 'कार्यात्मक समस्या का वर्णन करें...', 'செயல்பாட்டு சிக்கலை விவரிக்கவும்...', 'ఫంక్షనల్ సమస్యను వివరించండి...', 'કાર્યાત્મક સમસ્યાનું વર્ણન કરો...')} rows={3} />
                                        </div>
                                        <div>
                                            <Label lang={lang} text={addTranslations("Life Problem", "जीवन की समस्या", "வாழ்க்கை சிக்கல்", "జీవిత సమస్య", "જીવનની સમસ્યા")} />
                                            <TextArea value={pillar.life_problem || pillar.lifestyle_problem || ''} onChange={v => handlePillarFieldChange(pIdx, 'life_problem', v)} lang={lang} placeholder={addTranslations('Describe the life problem...', 'जीवन की समस्या का वर्णन करें...', 'வாழ்க்கைச் சிக்கலை விவரிக்கவும்...', 'జీవిత సమస్యను వివరించండి...', 'જીવનની સમસ્યાનું વર્ણન કરો...')} rows={3} />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handlePillarEditToggle(pIdx, false)} className="px-4 py-2 bg-slate-200 text-slate-800 text-sm font-medium rounded-md hover:bg-slate-300">Cancel</button>
                                            <button onClick={() => handleSavePillar(pIdx)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">Save & Update Pillar</button>
                                        </div>
                                    </div>
                                ) : (
                                    // DISPLAY VIEW
                                    <>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPillarIndices.has(pIdx)}
                                                    onChange={() => togglePillarSelection(pIdx)}
                                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                                                    title="Select to save"
                                                />
                                                <h3 className={`font-bold text-slate-800 line-clamp-2 ${isRecommended ? 'text-xl' : 'text-lg'}`} title={pillar.pillar_name || pillar.pillar_id || pillar.name}>{pillar.pillar_name || pillar.pillar_id || pillar.name || pillar.maslow_level}</h3>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleCopyPillar(pillar, pIdx)} className="p-1 text-slate-400 hover:text-slate-600" title="Copy">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                </button>
                                                <button onClick={() => handlePillarEditToggle(pIdx, true)} className="p-1 text-slate-400 hover:text-slate-600" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className={`flex-grow space-y-3 text-slate-600 mb-4 ${isRecommended ? 'text-base' : 'text-sm'}`}>
                                            {/* Hook Hidden as per request */}
                                            {/* {pillar.hook_world_snapshot && (...)} */}
                                            {/* Functional Problem Hidden (moved to top) */}

                                            {pillar.life_problem && (
                                                <div className="min-h-[60px]">
                                                    <strong className="block text-[11px] uppercase text-slate-500 font-bold tracking-wider mb-1.5">Life Problem</strong>
                                                    <p className="text-slate-700 leading-snug line-clamp-3 text-[14.5px]" title={pillar.life_problem}>{pillar.life_problem}</p>
                                                </div>
                                            )}
                                        </div>

                                        {pillar.recommended && (
                                            <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-800 text-[12px] flex items-start gap-2 line-clamp-2 min-h-[56px]">
                                                <span className="text-lg">⭐</span>
                                                <div>
                                                    <strong className="font-bold">Recommended: </strong>
                                                    {pillar.recommendationReason}
                                                </div>
                                            </div>
                                        )}

                                        {pillar.error && (
                                            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs">
                                                {pillar.error}
                                            </div>
                                        )}

                                        <div className="mt-auto space-y-2">
                                            {accessLevel === ACCESS_LEVELS.FULL && (
                                                <button
                                                    onClick={() => { setActiveStoryTab(pIdx); handleGenerateStories(pIdx); }}
                                                    disabled={pillar.isGeneratingStories}
                                                    className={`w-full py-2.5 border text-sm font-bold rounded-lg shadow-sm transition-colors flex justify-center items-center ${isRecommended
                                                        ? 'border-emerald-700 text-emerald-700 bg-white hover:bg-emerald-700 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200'
                                                        : 'border-slate-400 text-slate-600 bg-white hover:bg-slate-100 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200'
                                                        }`}
                                                >
                                                    {pillar.isGeneratingStories ? <div className="loader mr-2 -ml-1 border-emerald-700 border-t-transparent"></div> : null}
                                                    <TranslatedText lang={lang} text={pillar.isGeneratingStories ? translations.generating : translations.generateStory} />
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Generated Stories Section */}
            {storyTabs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Generated Stories</h3>

                    {/* Storyboard: one story from each of two pillars */}
                    {accessLevel === ACCESS_LEVELS.FULL && onDownloadStoryboard && (
                        <div className="mb-8 p-4 sm:p-5 rounded-xl border border-emerald-200 bg-emerald-50/60">
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                                <h4 className="text-lg font-bold text-slate-800">Storyboard</h4>
                                <p className="text-xs text-slate-500">Pick any two stories, from one pillar or two.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[0, 1].map(slot => {
                                    const pick = picks[slot];
                                    const pickedStory = pick ? getDisplayedStory(adPillars[pick.pIdx].stories![pick.sIdx]) : null;
                                    return pick && pickedStory ? (
                                        <div key={slot} className="p-3 rounded-lg bg-white border border-emerald-300 shadow-sm">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                                                    Concept {slot + 1} · {pillarLabel(adPillars[pick.pIdx])}{pickedStory.genre ? ` · ${pickedStory.genre}` : ''}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleStoryboardPick(pick.pIdx, pick.sIdx)}
                                                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                                                    title="Remove from storyboard"
                                                    aria-label={`Remove concept ${slot + 1} from storyboard`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1" htmlFor={`storyboard-title-${slot}`}>Concept title</label>
                                            <input
                                                id={`storyboard-title-${slot}`}
                                                type="text"
                                                value={pick.title}
                                                onChange={e => updatePickTitle(slot, e.target.value)}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                            {pickedStory.overview && <p className="mt-2 text-xs text-slate-600 line-clamp-2">{pickedStory.overview}</p>}

                                            {onGenerateMoodBoard && (() => {
                                                const key = moodBoardKey(pick);
                                                const image = moodBoards[key];
                                                const status = moodBoardStatus[key] || {};
                                                return (
                                                    <div className="mt-3 pt-3 border-t border-emerald-100">
                                                        <span className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Mood board</span>
                                                        {status.loading ? (
                                                            <div className="flex items-center gap-3 p-4 rounded-md bg-slate-50 text-sm text-slate-600" role="status">
                                                                <div className="loader border-emerald-600 border-t-transparent w-5 h-5 shrink-0"></div>
                                                                Creating the mood board. This can take a minute or two.
                                                            </div>
                                                        ) : image ? (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openImageViewer(image.dataUrl)}
                                                                    className="block w-full p-0 rounded-md overflow-hidden border border-slate-200 hover:border-emerald-400"
                                                                    title="View full size"
                                                                >
                                                                    <img src={image.dataUrl} alt={`Mood board for concept ${slot + 1}`} className="block w-full h-auto" />
                                                                </button>
                                                                <span className="mt-2 block text-xs text-emerald-700 font-semibold">Goes into the deck</span>
                                                            </>
                                                        ) : status.error ? (
                                                            <p className="text-xs text-red-600" role="alert">
                                                                {status.error}{' '}
                                                                <button type="button" onClick={() => handleGenerateMoodBoard(pick)} className="p-0 font-semibold underline text-red-700 hover:text-red-800">Try again</button>
                                                            </p>
                                                        ) : (
                                                            <p className="text-xs text-slate-400">Appears here after “Create mood boards”.</p>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    ) : (
                                        <div key={slot} className="p-3 rounded-lg border-2 border-dashed border-emerald-200 bg-white/60 flex items-center justify-center min-h-[96px] text-sm text-slate-500 text-center">
                                            Concept {slot + 1}: use “Add to storyboard” on a story
                                        </div>
                                    );
                                })}
                            </div>
                            {onGenerateMoodBoard && (
                                <div className="mt-4 p-3 sm:p-4 rounded-lg bg-white border border-emerald-200">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <span className="block text-[11px] font-bold text-slate-500 uppercase">Pictures and logos</span>
                                            <span className="block text-xs text-slate-500 mt-0.5">Optional. Used for both mood boards.</span>
                                        </div>
                                        <label className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-md border ${moodBoardRefs.length >= MAX_REFERENCE_IMAGES
                                            ? 'text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed'
                                            : 'text-emerald-700 border-emerald-600 bg-white hover:bg-emerald-50 cursor-pointer'}`}>
                                            + Upload
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="sr-only"
                                                disabled={moodBoardRefs.length >= MAX_REFERENCE_IMAGES}
                                                onChange={e => { handleReferenceUpload(e.target.files); e.target.value = ''; }}
                                            />
                                        </label>
                                    </div>

                                    {moodBoardRefs.length > 0 && (
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {moodBoardRefs.map((ref, i) => (
                                                <li key={ref.id} className="relative">
                                                    <img src={ref.image.data} alt={`Uploaded picture ${i + 1}: ${ref.image.fileName}`} title={ref.image.fileName} className="w-20 h-20 rounded-md object-contain bg-slate-50 border border-slate-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setMoodBoardRefs(prev => prev.filter(r => r.id !== ref.id))}
                                                        className="absolute -top-2 -right-2 p-0.5 rounded-full bg-white border border-slate-300 text-slate-500 hover:text-red-600 shadow-sm"
                                                        aria-label={`Remove ${ref.image.fileName}`}
                                                        title="Remove"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {refUploadError && <p className="mt-2 text-xs text-amber-800" role="status">{refUploadError}</p>}
                                    {moodBoardRefs.length > 0 && (
                                        <p className="mt-2 text-[11px] text-slate-400">{moodBoardRefs.length} of {MAX_REFERENCE_IMAGES}. Not saved; they clear when the page reloads.</p>
                                    )}
                                </div>
                            )}
                            {storyboardNotice && (
                                <p className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2" role="status">{storyboardNotice}</p>
                            )}
                            <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
                                {picks.length === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStoryboardPicks([picks[1], picks[0]])}
                                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
                                    >
                                        Swap order
                                    </button>
                                )}
                                {onGenerateMoodBoard && picks.length === 2 && picksNeedingMoodBoard.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleCreateMoodBoards}
                                        disabled={isAnyMoodBoardLoading}
                                        className="px-5 py-2 text-sm font-bold text-emerald-700 bg-white border-2 border-emerald-700 rounded-md hover:bg-emerald-50 disabled:text-slate-400 disabled:border-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isAnyMoodBoardLoading && <div className="loader border-emerald-700 border-t-transparent w-4 h-4"></div>}
                                        {isAnyMoodBoardLoading ? 'Creating mood boards...' : 'Create mood boards'}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleDownloadStoryboard}
                                    disabled={picks.length !== 2 || isBuildingDeck || isAnyMoodBoardLoading}
                                    className="px-5 py-2 text-sm font-bold text-white bg-emerald-700 rounded-md shadow-sm hover:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
                                    title={picks.length !== 2 ? 'Pick two stories first' : isAnyMoodBoardLoading ? 'Wait for the mood board to finish' : 'Download the storyboard deck (.pptx)'}
                                >
                                    {isBuildingDeck && <div className="loader border-white border-t-transparent w-4 h-4"></div>}
                                    {isBuildingDeck ? 'Creating deck...' : 'Download storyboard deck'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* One tab per pillar, styled like the Evaluations tabs */}
                    <div role="tablist" aria-label="Stories by pillar" className="flex items-end gap-2 overflow-x-auto">
                        {storyTabs.map(tab => {
                            const isActive = tab.pIdx === currentTab;
                            const pickedHere = picks.map((pk, i) => (pk.pIdx === tab.pIdx ? i : -1)).filter(i => i !== -1);
                            return (
                                <button
                                    key={tab.pIdx}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveStoryTab(tab.pIdx)}
                                    className={`relative -mb-px shrink-0 min-w-[180px] px-5 pt-3 pb-3 text-left rounded-t-xl border transition-colors ${isActive
                                        ? 'z-10 bg-white border-slate-200 border-b-white border-t-2 border-t-emerald-700 hover:border-slate-200 hover:border-b-white hover:border-t-emerald-700'
                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        P{tab.pIdx + 1} - {tab.isGenerating ? 'Generating' : `${tab.count} ${tab.count === 1 ? 'story' : 'stories'}`}
                                        {tab.isGenerating && <span className="loader border-emerald-600 border-t-transparent w-3 h-3"></span>}
                                    </span>
                                    <span className="mt-1 flex items-center gap-2">
                                        <span className={`text-base font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{tab.name}</span>
                                        {pickedHere.map(i => (
                                            <span key={i} className="text-[10px] font-black uppercase tracking-wider text-white bg-emerald-600 rounded px-1.5 py-0.5">C{i + 1}</span>
                                        ))}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div role="tabpanel" className="border border-slate-200 rounded-b-xl rounded-tr-xl bg-white p-4 sm:p-6">
                    {tabStories.length === 0 && (
                        <div className="flex items-center justify-center gap-3 p-12 text-slate-500" role="status">
                            <div className="loader border-emerald-600 border-t-transparent w-6 h-6"></div>
                            Generating stories...
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tabStories.map((story) => {
                            const storyId = `story-${story.pIdx}-${story.sIdx}`;
                            const storyToDisplay = getDisplayedStory(story);
                            if (!storyToDisplay) return null;
                            const pickIndex = pickIndexOf(story.pIdx, story.sIdx);

                            return (
                                <div
                                    key={storyId}
                                    className={`p-4 rounded-lg border shadow-sm flex flex-col transition-all duration-200 ${
                                        pickIndex !== -1
                                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                                            : story.isSelected
                                            ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300'
                                            : 'bg-white border-slate-200'
                                    }`}
                                >
                                    {accessLevel === ACCESS_LEVELS.FULL && onDownloadStoryboard && (
                                        <button
                                            type="button"
                                            onClick={() => toggleStoryboardPick(story.pIdx, story.sIdx)}
                                            className={`mb-3 w-full py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border transition-colors ${pickIndex !== -1
                                                ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
                                                : 'bg-white border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                                                }`}
                                        >
                                            {pickIndex !== -1 ? `✓ Storyboard concept ${pickIndex + 1}` : '+ Add to storyboard'}
                                        </button>
                                    )}
                                    <div className="mb-2 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {/* Selection checkbox */}
                                            <input
                                                type="checkbox"
                                                id={`story-select-${story.pIdx}-${story.sIdx}`}
                                                checked={!!story.isSelected}
                                                onChange={() => handleToggleStorySelection(story.pIdx, story.sIdx)}
                                                className="h-4 w-4 text-indigo-600 border-slate-300 rounded cursor-pointer focus:ring-indigo-500"
                                                title="Select for Brief export"
                                            />
                                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                                {story.pillarName}
                                            </div>
                                        </div>
                                        {accessLevel === ACCESS_LEVELS.FULL && (
                                            <select
                                                className="text-xs border border-slate-300 rounded px-1 py-0.5 bg-white text-slate-700 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
                                                onChange={(e) => handleTranslateStory(story.pIdx, story.sIdx, e.target.value)}
                                                defaultValue=""
                                                disabled={story.isTranslating}
                                            >
                                                <option value="" disabled>{story.isTranslating ? 'Translating...' : 'Translate to...'}</option>
                                                {INDIAN_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                                            </select>
                                        )}
                                    </div>
                                    {story.isTranslating ? (
                                        <div className="flex flex-col items-center justify-center p-12 text-slate-500 animate-fade-in">
                                            <div className="loader mb-3 border-teal-600 border-t-transparent w-8 h-8"></div>
                                            <p className="text-sm font-medium">Translating Story...</p>
                                        </div>
                                    ) : (
                                        <Storyboard
                                            story={storyToDisplay}
                                            onCopy={(s) => handleCopyStory(s, story.pIdx, story.sIdx)}
                                            copied={copiedItemId === storyId}
                                            onFieldChange={(sIdx, field, val) => handleStoryFieldChange(story.pIdx, sIdx, field, val)}
                                            sIdx={story.sIdx}
                                            pIdx={story.pIdx}
                                            onViewOriginal={() => handleToggleViewOriginal(story.pIdx, story.sIdx)}
                                            isViewingOriginal={story.isViewingOriginal}
                                            hasOriginal={!!story.originalStory}
                                        />
                                    )}

                                    {story.error && (
                                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs text-center">
                                            {story.error}
                                        </div>
                                    )}

                                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 mt-auto">
                                        <TextArea
                                            value={transcribingStoryId === storyId ? 'Processing audio...' : (updateRequests[storyId] || '')}
                                            onChange={text => setUpdateRequests(prev => ({ ...prev, [storyId]: text }))}
                                            lang={lang}
                                            placeholder={addTranslations('Request changes...', 'बदलाव का अनुरोध करें...', 'மாற்றங்களைக் கோருங்கள்...', 'మార్పులను అభ్యర్థించండి...', 'ફેરફારોની విનંતી કરો...')}
                                            rows={2}
                                            disabled={transcribingStoryId === storyId}
                                        />
                                        <div className="flex flex-wrap justify-end items-center gap-2">
                                            {accessLevel === ACCESS_LEVELS.FULL && (
                                                <>
                                                    <div className="flex gap-2 mr-auto sm:mr-0">
                                                        <button
                                                            onClick={() => isRecording === storyId ? stopRecording() : startRecording(story.pIdx, story.sIdx)}
                                                            className={`p-2 rounded-full transition-colors ${isRecording === storyId ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                                            title={isRecording === storyId ? "Stop Recording" : "Voice Update"}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                            </svg>
                                                        </button>

                                                        {/* Edit/Save Button */}
                                                        {story.isEditing ? (
                                                            <button
                                                                onClick={() => handleSaveStory(story.pIdx, story.sIdx)}
                                                                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1"
                                                                title="Save Story"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                SAVE
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleStoryEditToggle(story.pIdx, story.sIdx, true)}
                                                                className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                                                                title="Edit Story"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Version Navigation */}
                                                    {story.versions && story.versions.length > 0 && (
                                                        <div className="flex items-center bg-slate-100 rounded-md border border-slate-200 shadow-inner overflow-hidden">
                                                            <button
                                                                onClick={() => handleNavigateVersion(story.pIdx, story.sIdx, 'prev')}
                                                                className="px-3 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors disabled:opacity-20"
                                                                disabled={story.currentVersionIndex === 0}
                                                                title="Previous Version"
                                                            >
                                                                &larr;
                                                            </button>
                                                            <div className="px-3 py-1 bg-white border-x border-slate-200">
                                                                <span className="text-[10px] font-black text-indigo-600 tracking-tighter block leading-none">VERSION</span>
                                                                <span className="text-sm font-bold text-slate-800 leading-none">
                                                                    V{story.currentVersionIndex === -1 ? story.versions.length + 1 : story.currentVersionIndex! + 1}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleNavigateVersion(story.pIdx, story.sIdx, 'next')}
                                                                className="px-3 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors disabled:opacity-20"
                                                                disabled={story.currentVersionIndex === -1}
                                                                title="Next Version"
                                                            >
                                                                &rarr;
                                                            </button>
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={() => handleSubmitUpdate(story.pIdx, story.sIdx)}
                                                        disabled={story.isUpdating || !updateRequests[storyId]}
                                                        className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 transition-colors uppercase tracking-wider"
                                                    >
                                                        {story.isUpdating ? 'Updating...' : 'Update'}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div >
                    </div>
                </div >
            )}

            {/* Custom Story Modal */}
            {
                isCustomStoryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Create Custom Story</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Describe the story you want to generate for this pillar.
                            </p>
                            <textarea
                                value={customStoryPrompt}
                                onChange={(e) => setCustomStoryPrompt(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                                placeholder="Enter your story idea..."
                                autoFocus
                            />
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsCustomStoryModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-md hover:bg-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitCustomStory}
                                    disabled={!customStoryPrompt.trim()}
                                    className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
                                >
                                    Generate Story
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AdCreative;
