import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/news.types';
import { formatDate, validateImageUrl } from '../../utils/helpers';
import BookmarkButton from '../BookmarkButton';
import { useAppSelector } from '../../store/hooks';

interface NewsCardProps {
    article: Article;
    index?: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index = 0 }) => {
    const imageUrl = validateImageUrl(article.urlToImage);
    const encodedUrl = encodeURIComponent(article.url);
    const articleLink = `/article?url=${encodedUrl}`;
    const darkMode = useAppSelector((state) => state.news.darkMode);

    return (
        <div
            className={`stagger-item rounded-xl shadow-md overflow-hidden card-hover flex flex-col ${
                darkMode ? 'bg-slate-800' : 'bg-white'
            }`}
            style={{ animationDelay: `${(index % 3) * 0.1}s` }}
        >
            <Link to={articleLink} className="block">
                <div className="relative h-52 overflow-hidden group">
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = validateImageUrl(null);
                        }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3">
            <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              {article.source.name}
            </span>
                    </div>
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{formatDate(article.publishedAt)}</span>
                    </div>
                    <BookmarkButton article={article} compact />
                </div>

                <Link to={articleLink}>
                    <h3 className={`text-lg font-bold mb-3 line-clamp-2 leading-snug hover:text-accent transition-colors duration-200 cursor-pointer ${
                        darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                        {article.title}
                    </h3>
                </Link>

                <p className={`text-sm mb-4 line-clamp-3 leading-relaxed flex-grow ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                    {article.description || 'No description available'}
                </p>

                {article.author && (
                    <div className={`flex items-center text-xs mb-4 pb-4 border-b ${
                        darkMode ? 'text-gray-500 border-slate-700' : 'text-gray-500 border-gray-100'
                    }`}>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="truncate">{article.author}</span>
                    </div>
                )}

                <div className="flex gap-3 mt-auto">
                    <Link
                        to={articleLink}
                        className="flex-1 bg-accent text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 text-center text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 btn-primary"
                    >
                        Read Article
                    </Link>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                            darkMode
                                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title="Open in new tab"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
