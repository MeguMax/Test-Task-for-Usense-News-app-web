import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetToHome } from '../../store/slices/newsSlice';
import { useDarkMode } from '../../hooks/useDarkMode';
import MobileMenu from "../MobileMenu/MobileMenu";

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { darkMode, toggle } = useDarkMode();
    const bookmarkedCount = useAppSelector((state) => state.news.bookmarkedArticles.length);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(resetToHome());
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    scrolled ? 'shadow-2xl py-3' : 'shadow-lg py-4'
                } ${darkMode ? 'bg-slate-900 text-white' : 'bg-primary text-white'}`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <a
                            href="/"
                            onClick={handleHomeClick}
                            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-300 group cursor-pointer"
                        >
                            <div className={`rounded-lg p-1.5 sm:p-2 group-hover:scale-110 transition-transform duration-300 ${
                                darkMode ? 'bg-blue-600' : 'bg-accent'
                            }`}>
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold tracking-tight">NewsWorld</h1>
                                <p className={`text-xs sm:text-sm hidden sm:block ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                                    Global News Hub
                                </p>
                            </div>
                        </a>

                        <nav className="flex items-center gap-2 sm:gap-4">
                            {/* Dark mode toggle */}
                            <button
                                onClick={toggle}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    darkMode
                                        ? 'bg-slate-800 hover:bg-slate-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                }`}
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? (
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>

                            {/* Saved button - показується завжди на мобільних як іконка */}
                            <Link
                                to="/bookmarks"
                                className={`md:hidden relative p-2 rounded-lg transition-all duration-200 ${
                                    darkMode
                                        ? 'bg-slate-800 hover:bg-slate-700'
                                        : 'bg-white/10 hover:bg-white/20'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                {bookmarkedCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {bookmarkedCount > 9 ? '9+' : bookmarkedCount}
                  </span>
                                )}
                            </Link>

                            {/* Desktop menu */}
                            <div className="hidden md:flex items-center gap-2">
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-lg transition-colors ${
                                        darkMode
                                            ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/bookmarks"
                                    className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 relative ${
                                        darkMode
                                            ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    <span>Saved</span>
                                    {bookmarkedCount > 0 && (
                                        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                                            darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-white/20 text-white'
                                        }`}>
                      {bookmarkedCount}
                    </span>
                                    )}
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className={`md:hidden p-2 rounded-lg transition-colors ${
                                    darkMode ? 'hover:bg-slate-800' : 'hover:bg-white/10'
                                }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
};

export default Header;
