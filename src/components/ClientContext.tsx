import React, { createContext, useContext, useState, useEffect } from 'react';
import '../constants/clients'
import {initClients} from "../constants/clients";

const ClientContext = createContext();

export function ClientProvider({ children }) {
    const [clients, setClients] = useState(initClients);
    const [dayMode, setDayMode] = useState(false);

    // Загрузка данных из localStorage при инициализации
    useEffect(() => {
        const storedClients = localStorage.getItem('clients');
        if (storedClients) {
            setClients(JSON.parse(storedClients));
        } else {
            setClients(initClients); // Установка начальных данных, если localStorage пуст
        }
    }, []);

    // Обновление данных клиента по индексу и сохранение в localStorage
    function updateClient(index, updatedClient) {
        const newClients = [...clients];
        newClients[index] = updatedClient;
        setClients(newClients);
        localStorage.setItem('clients', JSON.stringify(newClients)); // Сохраняем в localStorage
    }

    // Добавление нового клиента
    function addClient(newClient) {
        const updatedClients = [...clients, newClient];
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients)); // Сохраняем в localStorage
    }

    // Удаление клиента по индексу
    function removeClient(index) {
        const updatedClients = [...clients];
        updatedClients.splice(index, 1);
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients)); // Сохраняем в localStorage
    }

    return (
        <ClientContext.Provider value={{ clients, updateClient, addClient, removeClient, dayMode, setDayMode }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useClientContext() {
    return useContext(ClientContext);
}
