import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNews, setSearchQuery, setPage, setSortBy } from '../../store/slices/newsSlice';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import ActiveFilters from '../../components/ActiveFilters';
import NewsCard from '../../components/NewsCard';
import Pagination from '../../components/Pagination';
import SkeletonCard from '../../components/SkeletonCard';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        articles,
        loading,
        error,
        totalResults,
        currentPage,
        searchQuery,
        selectedCategories,
        sortBy,
        darkMode
    } = useAppSelector((state) => state.news);

    useEffect(() => {
        dispatch(fetchNews({
            categories: selectedCategories,
            page: currentPage,
            searchQuery: searchQuery,
            sortBy: sortBy
        }));
    }, [dispatch, selectedCategories, currentPage, searchQuery, sortBy]);

    const handleSearch = useCallback(
        (query: string) => {
            dispatch(setSearchQuery(query));
        },
        [dispatch]
    );

    const handleSortChange = useCallback(
        (sort: 'publishedAt' | 'popularity' | 'relevancy') => {
            dispatch(setSortBy(sort));
        },
        [dispatch]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            dispatch(setPage(page));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [dispatch]
    );

    const isSearchMode = searchQuery.trim().length > 0;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
            <Header />

            <main className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
                <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

                <ActiveFilters />

                {/* Filter controls bar - стек на мобільних */}
                <div className="flex flex-col gap-4 mb-6">
                    {!isSearchMode && (
                        <div className="w-full">
                            <CategoryFilter />
                        </div>
                    )}

                    {/* Sort dropdown */}
                    {(isSearchMode || articles.length > 0) && (
                        <div className={`rounded-xl shadow-md p-4 sm:p-6 slide-down w-full ${
                            darkMode ? 'bg-slate-800' : 'bg-white'
                        }`}>
                            <label className={`block text-sm font-semibold mb-3 ${
                                darkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value as any)}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 cursor-pointer text-sm sm:text-base ${
                                    darkMode
                                        ? 'bg-slate-700 border-slate-600 text-gray-200 hover:border-slate-500 focus:border-blue-500'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 focus:border-accent'
                                }`}
                            >
                                <option value="publishedAt">Latest First</option>
                                <option value="popularity">Most Popular</option>
                                <option value="relevancy">Most Relevant</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Search mode indicator */}
                {isSearchMode && (
                    <div className={`border-l-4 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 shadow-sm slide-down ${
                        darkMode
                            ? 'bg-blue-900/30 border-blue-500'
                            : 'bg-blue-50 border-accent'
                    }`}>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div className="min-w-0 flex-1">
                                    <p className={`font-bold text-sm sm:text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        Search Active
                                    </p>
                                    <p className={`text-xs sm:text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Results for: <span className="font-semibold text-accent">"{searchQuery}"</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(setSearchQuery(''))}
                                className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                    darkMode
                                        ? 'text-gray-400 hover:text-gray-200'
                                        : 'text-gray-600 hover:text-accent'
                                }`}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={`border-l-4 border-red-500 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 shadow-md slide-down ${
                        darkMode ? 'bg-red-900/30 text-red-200' : 'bg-red-50 text-red-700'
                    }`}>
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm sm:text-base">Error</p>
                                <p className="text-xs sm:text-sm break-words">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : articles.length > 0 ? (
                    <>
                        <div className={`mb-4 sm:mb-6 font-medium slide-down px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg shadow-sm inline-block text-sm sm:text-base ${
                            darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-600'
                        }`}>
                            Found <span className="text-accent font-bold">{totalResults.toLocaleString()}</span> articles
                            {!isSearchMode && selectedCategories.length === 1 && (
                                <span className="hidden sm:inline"> in <span className="font-bold">{selectedCategories[0]}</span> category</span>
                            )}
                            {!isSearchMode && selectedCategories.length > 1 && (
                                <span className="hidden sm:inline"> across <span className="font-bold">{selectedCategories.length}</span> categories</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                            {articles.map((article, index) => (
                                <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalResults={totalResults}
                            pageSize={12}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className={`text-center py-16 sm:py-20 rounded-xl shadow-md ${
                        darkMode ? 'bg-slate-800' : 'bg-white'
                    }`}>
                        <svg className={`w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className={`text-lg sm:text-xl font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            No articles found
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isSearchMode
                                ? `Try different keywords or check spelling`
                                : `Try selecting different categories`}
                        </p>
                    </div>
                )}
            </main>

            <footer className={`py-6 sm:py-8 mt-12 sm:mt-16 ${
                darkMode ? 'bg-slate-950 text-gray-400' : 'bg-primary text-white'
            }`}>
                <div className="container mx-auto px-4 text-center">
                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                        © 2025 NewsWorld. Powered by NewsAPI
                    </p>
                    <p className={`text-xs sm:text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Stay informed, stay ahead
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
