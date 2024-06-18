import { Route, Routes } from 'react-router-dom';
import { memo, Suspense, useCallback } from 'react';
import { AppRoutesProps, routeConfig } from 'app/providers/router/routeConfig.tsx';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={''}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
