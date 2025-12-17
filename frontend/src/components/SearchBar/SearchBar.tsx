import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromHistory, clearSearchHistory } from '../../store/slices/newsSlice';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 600);
    const searchHistory = useAppSelector((state) => state.news.searchHistory);
    const darkMode = useAppSelector((state) => state.news.darkMode);
    const dispatch = useAppDispatch();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onSearch(debouncedSearchTerm.trim());
    }, [debouncedSearchTerm, onSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setSearchTerm('');
    };

    const handleHistoryClick = (query: string) => {
        setSearchTerm(query);
        setShowHistory(false);
    };

    const handleRemoveFromHistory = (query: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeFromHistory(query));
    };

    return (
        <div className={`rounded-xl shadow-md p-6 mb-6 slide-down ${
            darkMode ? 'bg-slate-800' : 'bg-white'
        }`} ref={wrapperRef}>
            <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                        className={`w-5 h-5 transition-colors duration-300 ${
                            isFocused
                                ? 'text-accent'
                                : darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowHistory(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search articles by keyword, topic, or phrase..."
                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        isFocused
                            ? 'border-accent shadow-lg'
                            : darkMode
                                ? 'border-slate-700 hover:border-slate-600 bg-slate-700 text-gray-200'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 hover:scale-125 ${
                            darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                        }`}
                        title="Clear search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Search history dropdown */}
                {showHistory && searchHistory.length > 0 && !searchTerm && (
                    <div className={`absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto ${
                        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className={`flex items-center justify-between px-4 py-2 border-b ${
                            darkMode ? 'border-slate-700' : 'border-gray-200'
                        }`}>
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Recent Searches
              </span>
                            <button
                                onClick={() => dispatch(clearSearchHistory())}
                                className={`text-xs transition-colors ${
                                    darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                                }`}
                            >
                                Clear All
                            </button>
                        </div>
                        {searchHistory.map((query, index) => (
                            <div
                                key={index}
                                onClick={() => handleHistoryClick(query)}
                                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors group ${
                                    darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className={`text-sm group-hover:text-accent ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {query}
                  </span>
                                </div>
                                <button
                                    onClick={(e) => handleRemoveFromHistory(query, e)}
                                    className={`opacity-0 group-hover:opacity-100 transition-all ${
                                        darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
