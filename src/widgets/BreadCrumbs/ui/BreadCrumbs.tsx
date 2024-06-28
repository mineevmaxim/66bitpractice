import { memo } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Crumb } from './Crumb/Crumb';
import cls from './BreadCrumbs.module.scss';
import { classNames } from 'shared/lib/classNames/classNames.ts';

type BreadCrumbsProps = {
    lastCrumb?: string;
    className?: string;
};

const BreadcrumbsComponent = ({ lastCrumb, className }: BreadCrumbsProps) => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <nav className={classNames(cls.Breadcrumbs, {}, [className])}>
            <div className={cls.container}>
                {breadcrumbs.map(({ breadcrumb, match }, index) => {
                    const isFirstCrumb = index === 0;
                    const isLastCrumb = index === breadcrumbs.length - 1;
                    const isShowArrow = index < breadcrumbs.length - 1;

                    return (
                        <Crumb
                            className={cls.crumb}
                            lastCrumb={lastCrumb}
                            key={match.pathname}
                            breadcrumb={breadcrumb}
                            isFirstCrumb={isFirstCrumb}
                            isLastCrumb={isLastCrumb}
                            isShowArrow={isShowArrow}
                            match={match}
                        />
                    );
                })}
            </div>
        </nav>
    );
};

export const Breadcrumbs = memo(BreadcrumbsComponent);
