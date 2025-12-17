import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { formatDate, validateImageUrl } from '../../utils/helpers';
import Header from '../../components/Header';
import BookmarkButton from '../../components/BookmarkButton';
import NewsCard from '../../components/NewsCard';

const ArticleDetails: React.FC = () => {
    const [searchParams] = useSearchParams();
    const articleUrl = searchParams.get('url');
    const { articles, darkMode } = useAppSelector((state) => state.news);
    const [article, setArticle] = useState<any>(null);
    const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

    useEffect(() => {
        if (articleUrl && articles.length > 0) {
            const foundArticle = articles.find((a) => a.url === decodeURIComponent(articleUrl));
            setArticle(foundArticle);

            if (foundArticle) {
                const related = articles
                    .filter(a =>
                        a.url !== foundArticle.url &&
                        (a.source.name === foundArticle.source.name ||
                            a.title.split(' ').some(word =>
                                word.length > 4 && foundArticle.title.includes(word)
                            ))
                    )
                    .slice(0, 3);
                setRelatedArticles(related);
            }
        }
    }, [articleUrl, articles]);

    if (!article) {
        return (
            <div className={`min-h-screen transition-colors duration-300 ${
                darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
                <Header />
                <div className="container mx-auto px-4 py-8 sm:py-16">
                    <div className={`rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto fade-in ${
                        darkMode ? 'bg-slate-800' : 'bg-white'
                    }`}>
                        <div className="mb-6">
                            <svg className={`w-20 sm:w-24 h-20 sm:h-24 mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className={`text-lg sm:text-xl mb-4 sm:mb-6 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Article not found
                        </p>
                        <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            The article you're looking for might have been removed or is temporarily unavailable.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-accent text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 font-semibold transition-all duration-200 text-sm sm:text-base"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Return to homepage
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const imageUrl = validateImageUrl(article.urlToImage);
    const fullContent = article.content?.replace(/\[\+\d+ chars\]/, '') || '';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
            <Header />

            <main className="container mx-auto px-4 py-4 sm:py-8 max-w-5xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <Link
                        to="/"
                        className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:gap-3 group text-sm sm:text-base ${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-accent hover:text-blue-600'
                        }`}
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to News</span>
                    </Link>
                    <BookmarkButton article={article} />
                </div>

                <article className={`rounded-xl sm:rounded-2xl shadow-xl overflow-hidden fade-in ${
                    darkMode ? 'bg-slate-800' : 'bg-white'
                }`}>
                    <div className="relative h-56 sm:h-80 md:h-[500px] overflow-hidden group">
                        <img
                            src={imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = validateImageUrl(null);
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-4">
                <span className="bg-accent px-3 py-1.5 rounded-full font-semibold shadow-lg">
                  {article.source.name}
                </span>
                                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium">{formatDate(article.publishedAt)}</span>
                                </div>
                                {article.author && (
                                    <div className="hidden sm:flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="font-medium">{article.author}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-8 md:p-12">
                        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                            {article.title}
                        </h1>

                        {article.description && (
                            <div className={`border-l-4 p-4 sm:p-6 mb-6 sm:mb-8 rounded-r-lg ${
                                darkMode
                                    ? 'bg-blue-900/30 border-blue-500'
                                    : 'bg-blue-50 border-accent'
                            }`}>
                                <p className={`text-base sm:text-xl font-medium leading-relaxed ${
                                    darkMode ? 'text-gray-300' : 'text-gray-800'
                                }`}>
                                    {article.description}
                                </p>
                            </div>
                        )}

                        {fullContent && (
                            <div className="mb-6 sm:mb-8">
                                <div className="prose prose-sm sm:prose-lg max-w-none">
                                    <div className={`text-base sm:text-lg leading-relaxed space-y-4 ${
                                        darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        {fullContent.split('\n').map((paragraph, index) => (
                                            paragraph.trim() && (
                                                <p key={index} className="mb-4">
                                                    {paragraph}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Article Metadata - Mobile стек, Desktop grid */}
                        <div className={`flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 ${
                            darkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex sm:block items-center justify-between sm:text-center">
                                <div className={`text-xs sm:text-sm font-semibold mb-0 sm:mb-1 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Published
                                </div>
                                <div className={`text-sm sm:text-lg font-bold ${
                                    darkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>
                                    {formatDate(article.publishedAt)}
                                </div>
                            </div>
                            <div className="flex sm:block items-center justify-between sm:text-center">
                                <div className={`text-xs sm:text-sm font-semibold mb-0 sm:mb-1 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Source
                                </div>
                                <div className={`text-sm sm:text-lg font-bold ${
                                    darkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>
                                    {article.source.name}
                                </div>
                            </div>
                            <div className="flex sm:block items-center justify-between sm:text-center">
                                <div className={`text-xs sm:text-sm font-semibold mb-0 sm:mb-1 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Author
                                </div>
                                <div className={`text-sm sm:text-lg font-bold ${
                                    darkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>
                                    {article.author || 'Unknown'}
                                </div>
                            </div>
                        </div>

                        {(!fullContent || fullContent.length < 200) && (
                            <div className={`border rounded-lg p-4 sm:p-6 text-center mb-6 sm:mb-8 ${
                                darkMode
                                    ? 'bg-slate-700/30 border-slate-600'
                                    : 'bg-gray-50 border-gray-200'
                            }`}>
                                <svg className={`w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 ${
                                    darkMode ? 'text-gray-500' : 'text-gray-400'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Read the complete article on the original source
                                </p>
                            </div>
                        )}

                        <div className="pt-4 sm:pt-6 border-t flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 sm:gap-3 bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-primary text-sm sm:text-lg"
                            >
                                <span className="truncate">Read on {article.source.name}</span>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                            <Link
                                to="/"
                                className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                                    darkMode
                                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="hidden sm:inline">Back to News</span>
                                <span className="sm:hidden">Back</span>
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Related Articles - адаптивна сітка */}
                {relatedArticles.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            {relatedArticles.map((related, index) => (
                                <NewsCard key={related.url} article={related} index={index} />
                            ))}
                        </div>
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

export default ArticleDetails;
