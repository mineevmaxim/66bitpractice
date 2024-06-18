import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage.ts';
import { ThemeContext } from 'shared/lib/context/ThemeContext.ts';
import { Theme } from 'shared/const/theme.ts';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
