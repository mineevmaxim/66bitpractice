import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider/ThemeProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);
