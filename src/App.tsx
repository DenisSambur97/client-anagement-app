// App.tsx
import React, { useEffect } from 'react';
import './App.css';
import InsertRow from './components/InsertRow.tsx';
import ClientTable from './components/ClientTable.tsx';
import { ClientProvider, useClientContext } from './components/ClientContext.tsx';

function App() {
    const { dayMode, selectedClient, setSelectedClient } = useClientContext();

    // Добавление темной темы для body
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
                <InsertRow selectedClient={selectedClient} setSelectedClient={setSelectedClient} />
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
