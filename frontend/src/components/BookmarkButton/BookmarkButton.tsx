import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleBookmark } from '../../store/slices/newsSlice';
import { Article } from '../../types/news.types';

interface BookmarkButtonProps {
    article: Article;
    compact?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ article, compact = false }) => {
    const dispatch = useAppDispatch();
    const bookmarkedArticles = useAppSelector((state) => state.news.bookmarkedArticles);
    const darkMode = useAppSelector((state) => state.news.darkMode);
    const isBookmarked = bookmarkedArticles.some(a => a.url === article.url);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleBookmark(article));
    };

    if (compact) {
        return (
            <button
                onClick={handleToggle}
                className={`p-2 rounded-lg transition-all duration-200 ${
                    isBookmarked
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : darkMode
                            ? 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
                <svg
                    className="w-5 h-5"
                    fill={isBookmarked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isBookmarked
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50'
                    : darkMode
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            <svg
                className="w-5 h-5"
                fill={isBookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
            </svg>
            {isBookmarked ? 'Saved' : 'Save'}
        </button>
    );
};

export default BookmarkButton;
