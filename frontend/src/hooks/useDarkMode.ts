import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleDarkMode } from '../store/slices/newsSlice';

export const useDarkMode = () => {
    const darkMode = useAppSelector((state) => state.news.darkMode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggle = () => {
        dispatch(toggleDarkMode());
    };

    return { darkMode, toggle };
};
