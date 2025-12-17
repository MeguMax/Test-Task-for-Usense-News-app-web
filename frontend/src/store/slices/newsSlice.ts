import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsState, SortOption, Article } from '../../types/news.types';
import { newsApi } from '../../services/api';

const loadBookmarks = (): Article[] => {
    try {
        const saved = localStorage.getItem('bookmarkedArticles');
        if (!saved) return [];

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
            if (typeof parsed[0] === 'string') {
                console.log('Migrating old bookmark format...');
                localStorage.removeItem('bookmarkedArticles');
                return [];
            }

            const validArticles = parsed.filter(item =>
                item &&
                typeof item === 'object' &&
                item.url &&
                item.title &&
                item.source
            );

            return validArticles;
        }

        return [];
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        localStorage.removeItem('bookmarkedArticles');
        return [];
    }
};

const loadSearchHistory = (): string[] => {
    try {
        const saved = localStorage.getItem('searchHistory');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const loadDarkMode = (): boolean => {
    try {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    } catch {
        return false;
    }
};

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
    searchQuery: '',
    selectedCategories: ['general'],
    sortBy: 'publishedAt',
    bookmarkedArticles: loadBookmarks(),
    searchHistory: loadSearchHistory(),
    darkMode: loadDarkMode(),
};

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({
               categories,
               page,
               searchQuery,
               sortBy
           }: {
        categories: string[];
        page: number;
        searchQuery?: string;
        sortBy: SortOption;
    }) => {
        if (searchQuery && searchQuery.trim()) {
            const response = await newsApi.searchNews(searchQuery, page, 12, sortBy);
            return response;
        }

        if (categories.length > 1) {
            const response = await newsApi.getMultipleCategories(categories, page, 12, sortBy);
            return response;
        }

        const response = await newsApi.getTopHeadlines(categories[0] || 'general', page, 12);
        return response;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            const query = action.payload.trim();
            state.searchQuery = query;
            state.currentPage = 1;

            if (query && !state.searchHistory.includes(query)) {
                state.searchHistory = [query, ...state.searchHistory.slice(0, 9)];
                localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
            }

            if (!query) {
                state.error = null;
            }
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            const index = state.selectedCategories.indexOf(category);

            if (index > -1) {
                if (state.selectedCategories.length > 1) {
                    state.selectedCategories.splice(index, 1);
                }
            } else {
                state.selectedCategories.push(category);
            }

            state.currentPage = 1;
            state.error = null;
        },
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.selectedCategories = action.payload.length > 0 ? action.payload : ['general'];
            state.currentPage = 1;
            state.error = null;
        },
        clearCategories: (state) => {
            state.selectedCategories = ['general'];
            state.currentPage = 1;
        },
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload;
            state.currentPage = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        toggleBookmark: (state, action: PayloadAction<Article>) => {
            const article = action.payload;

            if (!article || !article.url || !article.title || !article.source) {
                console.error('Invalid article:', article);
                return;
            }

            const index = state.bookmarkedArticles.findIndex(a => a.url === article.url);

            if (index > -1) {
                state.bookmarkedArticles.splice(index, 1);
            } else {
                state.bookmarkedArticles.push(article);
            }

            try {
                localStorage.setItem('bookmarkedArticles', JSON.stringify(state.bookmarkedArticles));
            } catch (error) {
                console.error('Error saving bookmarks:', error);
            }
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
        clearSearchHistory: (state) => {
            state.searchHistory = [];
            localStorage.removeItem('searchHistory');
        },
        removeFromHistory: (state, action: PayloadAction<string>) => {
            state.searchHistory = state.searchHistory.filter(item => item !== action.payload);
            localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
        },
        clearError: (state) => {
            state.error = null;
        },
        clearAllFilters: (state) => {
            state.searchQuery = '';
            state.selectedCategories = ['general'];
            state.sortBy = 'publishedAt';
            state.currentPage = 1;
            state.error = null;
        },
        resetToHome: (state) => {
            state.searchQuery = '';
            state.selectedCategories = ['general'];
            state.currentPage = 1;
            state.sortBy = 'publishedAt';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.articles;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export const {
    setSearchQuery,
    toggleCategory,
    setCategories,
    clearCategories,
    setSortBy,
    setPage,
    toggleBookmark,
    toggleDarkMode,
    clearSearchHistory,
    removeFromHistory,
    clearError,
    clearAllFilters,
    resetToHome
} = newsSlice.actions;

export default newsSlice.reducer;
