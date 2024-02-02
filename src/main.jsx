import './index.css'; // Ensure this is the first import in your main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import AppRouter from './Router.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
