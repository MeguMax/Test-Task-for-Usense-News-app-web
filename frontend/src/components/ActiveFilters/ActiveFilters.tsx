import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleCategory, setSearchQuery, setSortBy, clearAllFilters } from '../../store/slices/newsSlice';

const ActiveFilters: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedCategories, searchQuery, sortBy } = useAppSelector((state) => state.news);
    const darkMode = useAppSelector((state) => state.news.darkMode);

    const hasFilters = selectedCategories.length > 0 || searchQuery.trim() !== '' || sortBy !== 'publishedAt';

    if (!hasFilters) return null;

    const handleRemoveCategory = (category: string) => {
        if (selectedCategories.length > 1) {
            dispatch(toggleCategory(category));
        }
    };

    const handleClearSearch = () => {
        dispatch(setSearchQuery(''));
    };

    const handleResetSort = () => {
        dispatch(setSortBy('publishedAt'));
    };

    const handleClearAll = () => {
        dispatch(clearAllFilters());
    };

    return (
        <div className={`rounded-xl shadow-md p-4 mb-6 slide-down ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Active Filters
                </h3>
                <button
                    onClick={handleClearAll}
                    className={`text-xs font-medium transition-colors ${
                        darkMode
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-red-600 hover:text-red-700'
                    }`}
                >
                    Clear All
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {/* Category chips */}
                {selectedCategories.map((category) => (
                    <div
                        key={category}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            darkMode
                                ? 'bg-blue-900/50 text-blue-200'
                                : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                        <span className="capitalize">{category}</span>
                        {selectedCategories.length > 1 && (
                            <button
                                onClick={() => handleRemoveCategory(category)}
                                className={`hover:scale-110 transition-transform ${
                                    darkMode ? 'hover:text-red-400' : 'hover:text-red-600'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}

                {/* Search chip */}
                {searchQuery.trim() && (
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            darkMode
                                ? 'bg-purple-900/50 text-purple-200'
                                : 'bg-purple-100 text-purple-700'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>"{searchQuery}"</span>
                        <button
                            onClick={handleClearSearch}
                            className={`hover:scale-110 transition-transform ${
                                darkMode ? 'hover:text-red-400' : 'hover:text-red-600'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Sort chip */}
                {sortBy !== 'publishedAt' && (
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            darkMode
                                ? 'bg-green-900/50 text-green-200'
                                : 'bg-green-100 text-green-700'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        <span>{sortBy === 'popularity' ? 'Popular' : 'Relevant'}</span>
                        <button
                            onClick={handleResetSort}
                            className={`hover:scale-110 transition-transform ${
                                darkMode ? 'hover:text-red-400' : 'hover:text-red-600'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveFilters;
