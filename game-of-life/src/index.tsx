import { createRoot } from 'react-dom/client';
import App from './app/App';

// Init
const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(<App />);
