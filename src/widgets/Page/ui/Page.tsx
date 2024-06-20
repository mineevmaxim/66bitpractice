import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import cls from './Page.module.scss';
import { Breadcrumbs } from 'widgets/BreadCrumbs';

interface PageProps {
    className?: string;
    children: ReactNode;
    center?: boolean;
    onScrollEnd?: () => void;
    grid?: boolean;
    crumb?: string;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const { className, children, center = true, onScrollEnd, grid = false, crumb } = props;

    return (
        <>
            <Breadcrumbs lastCrumb={crumb} />
            <main
                className={classNames(cls.Page, { [cls.center]: center, [cls.grid]: grid }, [
                    className,
                ])}
                id={PAGE_ID}
            >
                {children}
                {onScrollEnd ? <div className={cls.trigger} /> : null}
            </main>
        </>
    );
});
