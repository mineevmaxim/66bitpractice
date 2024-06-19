import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import LogoIcon from 'shared/assets/icons/logo.svg';
import cls from './Navbar.module.scss';
import { Text } from 'shared/ui/Text/Text.tsx';
import { ThemeSwitcher } from 'features/ThemeSwitcher/ui/ThemeSwitcher.tsx';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.container}>
                <LogoIcon />
                <div className={cls.info}>
                    <a
                        className={cls.link}
                        href={'tel:+73432908476'}
                    >
                        <Text text={'+7 343 290 84 76'} />
                    </a>
                    <a
                        className={cls.link}
                        href={'mailto:info@66bit.ru'}
                    >
                        <Text text={'info@66bit.ru'} />
                    </a>
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
});
