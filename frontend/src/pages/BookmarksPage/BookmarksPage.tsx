import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Header from '../../components/Header';
import NewsCard from '../../components/NewsCard';

const BookmarksPage: React.FC = () => {
    const { bookmarkedArticles, darkMode } = useAppSelector((state) => state.news);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
            <Header />

            <main className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
                <div className="mb-6 sm:mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                        darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                        Saved Articles
                    </h1>
                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Articles you've bookmarked for later reading
                    </p>
                </div>

                {bookmarkedArticles.length > 0 ? (
                    <>
                        <div className={`mb-4 sm:mb-6 font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg shadow-sm inline-block text-sm sm:text-base ${
                            darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-600'
                        }`}>
                            You have <span className="text-accent font-bold">{bookmarkedArticles.length}</span> saved article{bookmarkedArticles.length !== 1 ? 's' : ''}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {bookmarkedArticles.map((article, index) => (
                                <NewsCard key={article.url} article={article} index={index} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={`text-center py-16 sm:py-20 rounded-xl shadow-md px-4 ${
                        darkMode ? 'bg-slate-800' : 'bg-white'
                    }`}>
                        <div className="mb-6">
                            <svg className={`w-20 sm:w-24 h-20 sm:h-24 mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <p className={`text-lg sm:text-xl font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                            No saved articles yet
                        </p>
                        <p className={`text-sm mb-6 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                            Start bookmarking articles to read them later
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-accent text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 font-semibold transition-all duration-200 text-sm sm:text-base"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Browse Articles
                        </Link>
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
                </div>
            </footer>
        </div>
    );
};

export default BookmarksPage;
