import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Language, MultilingualText } from '../types';

export interface SearchableOption {
  label: MultilingualText;
  hint?: string;      // plain-language explanation shown under the option
  keywords?: string;  // extra search terms ("heart" finds Cardiology)
}

interface SearchableMultiSelectProps {
  options: Record<string, SearchableOption>;
  value: string[];
  onChange: (v: string[]) => void;
  lang: Language;
  placeholder: MultilingualText;
  noMatchText: MultilingualText;
  othersKey?: string;
  othersLabel?: MultilingualText;
}

/**
 * Type-to-filter dropdown for long option lists. Selected options show as chips
 * above the input; "Others" stays pinned at the bottom of the list.
 */
const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  options, value = [], onChange, lang, placeholder, noMatchText, othersKey, othersLabel
}) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const labelOf = (key: string) => {
    if (othersKey && key === othersKey && othersLabel) return othersLabel[lang] || othersLabel.en;
    const opt = options[key];
    return opt ? (opt.label[lang] || opt.label.en) : key;
  };

  const filteredKeys = useMemo(() => {
    const q = query.trim().toLowerCase();
    const keys = Object.keys(options).filter(key => {
      if (!q) return true;
      const opt = options[key];
      const haystack = [key, opt.label.en, opt.label[lang], opt.hint, opt.keywords].filter(Boolean).join(' ').toLowerCase();
      return q.split(/\s+/).every(token => haystack.includes(token));
    });
    return othersKey ? [...keys, othersKey] : keys;
  }, [options, query, lang, othersKey]);

  const realMatches = othersKey ? filteredKeys.length - 1 : filteredKeys.length;

  useEffect(() => { setHighlight(0); }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const row = listRef.current?.querySelector<HTMLElement>(`[data-index="${highlight}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [highlight]);

  const toggle = (key: string) => {
    onChange(value.includes(key) ? value.filter(v => v !== key) : [...value, key]);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight(h => Math.min(h + 1, filteredKeys.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      // Never let Enter submit the whole form from here
      e.preventDefault();
      if (open && filteredKeys[highlight]) toggle(filteredKeys[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Backspace' && !query && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative mt-3"
      onBlur={(e) => {
        // Close the list when focus moves elsewhere (e.g. into the "Others" box)
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {value.map(key => (
            <span key={key} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 pl-4 pr-2 py-1.5 text-[14px] font-medium text-white shadow-sm">
              {labelOf(key)}
              <button
                type="button"
                onClick={() => toggle(key)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-700 hover:text-white"
                aria-label={`Remove ${labelOf(key)}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder[lang] || placeholder.en}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          className="w-full rounded-xl border border-neutral-300 pl-10 pr-4 py-3 text-[15px] outline-none ring-neutral-300 focus:ring-2 min-h-[48px] shadow-sm transition-all focus:border-indigo-500"
        />
      </div>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {realMatches === 0 && (
            <li className="px-4 py-2 text-[13px] text-neutral-500">{noMatchText[lang] || noMatchText.en}</li>
          )}
          {filteredKeys.map((key, idx) => {
            const selected = value.includes(key);
            const isOthers = othersKey !== undefined && key === othersKey;
            const hint = isOthers ? undefined : options[key]?.hint;
            return (
              <li
                key={key}
                data-index={idx}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggle(key)}
                onMouseEnter={() => setHighlight(idx)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 ${isOthers ? 'border-t border-neutral-100' : ''} ${idx === highlight ? 'bg-indigo-50' : ''}`}
              >
                <div className="min-w-0">
                  <div className={`text-[14px] ${selected ? 'font-semibold text-neutral-900' : 'text-neutral-800'}`}>{labelOf(key)}</div>
                  {hint && <div className="text-[12px] leading-tight text-neutral-500">{hint}</div>}
                </div>
                {selected && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchableMultiSelect;
