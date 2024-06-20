import { useTheme } from 'shared/lib/hooks/useTheme/useTheme.ts';
import { classNames } from 'shared/lib/classNames/classNames.ts';
import { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';
import AppRouter from './providers/router/ui/AppRouter.tsx';

function App() {
    const { theme } = useTheme();

    return (
        <div
            id="app"
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
