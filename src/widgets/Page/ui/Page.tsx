import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    center?: boolean;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const { className, children, center = true, onScrollEnd } = props;

    return (
        <main
            className={classNames(cls.Page, { [cls.center]: center }, [className])}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} /> : null}
        </main>
    );
});
