import React, { createContext, useContext, useState, useEffect } from 'react';
import '../constants/clients';
import { initClients } from '../constants/clients';

export interface Client {
    name: string;
    age: number;
    subscription: string;
    employment: boolean;
}

export interface ClientContextType {
    clients: Client[];
    updateClient: (index: number, updatedClient: Client) => void;
    addClient: (newClient: Client) => void;
    removeClient: (index: number) => void;
    dayMode: boolean;
    setDayMode: (mode: boolean) => void;
    selectedClient: Client | null;
    setSelectedClient: (client: Client | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const [clients, setClients] = useState<Client[]>(initClients);
    const [dayMode, setDayMode] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    useEffect(() => {
        const storedClients = localStorage.getItem('clients');
        if (storedClients) {
            setClients(JSON.parse(storedClients));
        } else {
            setClients(initClients);
        }
    }, []);

    function updateClient(index: number, updatedClient: Client) {
        const newClients = [...clients];
        newClients[index] = updatedClient;
        setClients(newClients);
        localStorage.setItem('clients', JSON.stringify(newClients));
    }

    function addClient(newClient: Client) {
        const updatedClients = [...clients, newClient];
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
    }

    function removeClient(index: number) {
        const updatedClients = [...clients];
        updatedClients.splice(index, 1);
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
    }

    return (
        <ClientContext.Provider value={{ clients, updateClient, addClient, removeClient, dayMode, setDayMode, selectedClient, setSelectedClient }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useClientContext() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClientContext must be used within a ClientProvider');
    }
    return context;
}
