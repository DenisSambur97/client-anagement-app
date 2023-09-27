import React, { useEffect } from 'react';
import './App.css';
import InsertRow from './components/InsertRow';
import ClientTable from './components/ClientTable';
import { ClientProvider, useClientContext } from './components/ClientContext';

function App() {
    const { dayMode } = useClientContext();

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            if (dayMode) {
                body.classList.add('dark-theme');
            } else {
                body.classList.remove('dark-theme');
            }
        }
    }, [dayMode]);

    return (
        <>
            <h1 className={dayMode ? 'dark-theme' : ''}>Client Management App</h1>
            <div className={`App ${dayMode ? 'dark-theme' : ''}`}>
                <InsertRow />
                <ClientTable />
            </div>
        </>
    );
}

function AppWithProvider() {
    return (
        <ClientProvider>
            <App />
        </ClientProvider>
    );
}

export default AppWithProvider;
