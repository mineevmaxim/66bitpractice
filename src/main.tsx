import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
