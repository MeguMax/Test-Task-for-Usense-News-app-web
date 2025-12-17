import React from 'react';
import { Category } from '../../types/news.types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleCategory } from '../../store/slices/newsSlice';

const categories: { value: Category; label: string; icon: string }[] = [
    { value: 'general', label: 'General', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { value: 'business', label: 'Business', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { value: 'technology', label: 'Technology', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { value: 'health', label: 'Health', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { value: 'sports', label: 'Sports', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { value: 'entertainment', label: 'Entertainment', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
    { value: 'science', label: 'Science', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
];

const CategoryFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedCategories = useAppSelector((state) => state.news.selectedCategories);
    const darkMode = useAppSelector((state) => state.news.darkMode);

    const handleToggle = (category: string) => {
        dispatch(toggleCategory(category));
    };

    const isSelected = (category: string) => selectedCategories.includes(category);

    return (
        <div className={`rounded-xl shadow-md p-4 sm:p-6 slide-down ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Categories
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                        ? 'bg-blue-900/50 text-blue-200'
                        : 'bg-blue-100 text-blue-700'
                }`}>
          {selectedCategories.length} selected
        </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((cat) => {
                    const selected = isSelected(cat.value);
                    return (
                        <button
                            key={cat.value}
                            onClick={() => handleToggle(cat.value)}
                            disabled={selected && selectedCategories.length === 1}
                            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                selected
                                    ? darkMode
                                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-accent text-white shadow-lg scale-105'
                                    : darkMode
                                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                            }`}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                            </svg>
                            <span className="whitespace-nowrap">{cat.label}</span>
                            {selected && (
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>
            <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="hidden sm:inline">Select multiple categories to see combined results</span>
                <span className="sm:hidden">Tap to select multiple</span>
            </p>
        </div>
    );
};

export default CategoryFilter;
