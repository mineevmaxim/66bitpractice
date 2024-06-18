import { Text } from 'shared/ui/Text/Text.tsx';
import { useTheme } from 'shared/lib/hooks/useTheme/useTheme.ts';
import { classNames } from 'shared/lib/classNames/classNames.ts';
import { Suspense } from 'react';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            id="app"
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                {/*<Navbar />*/}
                <div className="content-page">
                    <button onClick={toggleTheme}>
                        <Text text={'switch theme'} />
                    </button>
                    {/*<AppRouter />*/}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
