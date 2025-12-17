import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const darkMode = useAppSelector((state) => state.news.darkMode);
    const location = useLocation();
    const bookmarkedCount = useAppSelector((state) => state.news.bookmarkedArticles.length);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={onClose}
            ></div>

            {/* Menu */}
            <div className={`fixed top-0 right-0 h-full w-72 z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
                darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
                <div className="p-6">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`mb-8 p-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-slate-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <nav className="space-y-2">
                        <Link
                            to="/"
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname === '/'
                                    ? 'bg-accent text-white'
                                    : darkMode
                                        ? 'hover:bg-slate-800 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-medium">Home</span>
                        </Link>

                        <Link
                            to="/bookmarks"
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname === '/bookmarks'
                                    ? 'bg-accent text-white'
                                    : darkMode
                                        ? 'hover:bg-slate-800 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            <span className="font-medium">Saved Articles</span>
                            {bookmarkedCount > 0 && (
                                <span className={`ml-auto px-2.5 py-1 text-xs font-semibold rounded-full ${
                                    darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                                }`}>
                  {bookmarkedCount}
                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Additional info */}
                    <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            © 2025 NewsWorld
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
