export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface NewsState {
    articles: Article[];
    loading: boolean;
    error: string | null;
    totalResults: number;
    currentPage: number;
    searchQuery: string;
    selectedCategories: string[];
    sortBy: 'publishedAt' | 'popularity' | 'relevancy';
    bookmarkedArticles: Article[];
    searchHistory: string[];
    darkMode: boolean;
}

export type Category = 'general' | 'business' | 'technology' | 'health' | 'sports' | 'entertainment' | 'science';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type SortOption = 'publishedAt' | 'popularity' | 'relevancy';
