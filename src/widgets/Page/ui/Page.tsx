import { classNames } from 'shared/lib/classNames/classNames';
import { memo, MutableRefObject, ReactNode, useRef } from 'react';
import cls from './Page.module.scss';
import { Breadcrumbs } from '../../BreadCrumbs/index.ts';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll.ts';

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
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        callback: onScrollEnd,
    });
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
                {onScrollEnd ? (
                    <div
                        className={cls.trigger}
                        ref={triggerRef}
                    />
                ) : null}
            </main>
        </>
    );
});
