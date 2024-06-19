import { memo, ReactNode } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbMatch } from 'use-react-router-breadcrumbs';
import cls from './Crumb.module.scss';
import { classNames } from 'shared/lib/classNames/classNames.ts';
import ChevronRight from 'shared/assets/icons/chevron-right.svg';
import { Text } from 'shared/ui/Text/Text.tsx';
import { RoutePath } from 'app/providers/router/routeConfig.tsx';

type TProps = {
    breadcrumb: ReactNode;
    className?: string;
    isFirstCrumb: boolean;
    isLastCrumb: boolean;
    isShowArrow: boolean;
    match: BreadcrumbMatch;
};

const mapRoutePathToTitle: Record<string, string> = {
    [RoutePath.main]: 'Главная',
    [RoutePath['staff']]: 'Список сотрудников',
};

const Component: FC<TProps> = ({
    breadcrumb,
    className,
    isFirstCrumb,
    isLastCrumb,
    isShowArrow,
    match,
}) => {
    const renderTitle = (crumb: string) => {
        if (isFirstCrumb) {
            return (
                <Link to={match.pathname || ''}>
                    <Text
                        className={cls.text}
                        variant={'secondary'}
                        text={mapRoutePathToTitle[match.pathname] ?? crumb}
                    />
                </Link>
            );
        } else if (isLastCrumb) {
            return (
                <Text
                    className={cls.text}
                    variant={'secondary'}
                    text={mapRoutePathToTitle[match.pathname] ?? crumb}
                />
            );
        } else {
            return (
                <Link to={match.pathname || ''}>
                    <Text
                        className={cls.text}
                        variant={'secondary'}
                        text={mapRoutePathToTitle[match.pathname] ?? crumb}
                    />
                </Link>
            );
        }
    };

    return (
        <span className={classNames(cls.Crumb, {}, [className])}>
            {renderTitle(breadcrumb as string)}
            {isShowArrow && (
                <div className={cls.CrumbIcon__arrow}>
                    <ChevronRight />
                </div>
            )}
        </span>
    );
};

export const Crumb = memo(Component);
