import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { Switch } from '@headlessui/react';
import { useTheme } from 'shared/lib/hooks/useTheme/useTheme.ts';
import { Theme } from 'shared/const/theme.ts';
import MoonIcon from 'shared/assets/icons/moon.svg';
import SunIcon from 'shared/assets/icons/sun.svg';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch
            checked={theme === Theme.DARK}
            onChange={toggleTheme}
            className={classNames(cls.ThemeSwitcher, { [cls.dark]: theme === Theme.DARK }, [
                className,
            ])}
        >
            <div className={cls.icon}>{theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}</div>
        </Switch>
    );
});
