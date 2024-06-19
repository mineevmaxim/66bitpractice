import { useTheme } from 'shared/lib/hooks/useTheme/useTheme.ts';
import { classNames } from 'shared/lib/classNames/classNames.ts';
import { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';
import AppRouter from 'app/providers/router/ui/AppRouter.tsx';
import { Breadcrumbs } from 'widgets/BreadCrumbs/ui/BreadCrumbs.tsx';

function App() {
    const { theme } = useTheme();

    return (
        <div
            id="app"
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar />
                <Breadcrumbs />
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
