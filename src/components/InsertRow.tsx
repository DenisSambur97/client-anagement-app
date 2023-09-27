import React, { useState, useEffect } from 'react';
import { useClientContext, Client } from './ClientContext.tsx';
import Switch from 'react-switch';
import UpIcon from '../assets/arrow-up.svg'
import DownIcon from '../assets/arrow-down.svg'

function InsertRow() {
    const { addClient, setDayMode, dayMode, selectedClient, updateClient, removeClient, clients, setSelectedClient } = useClientContext();
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [subscription, setSubscription] = useState<string>('Subscribed');
    const [employment, setEmployment] = useState<boolean>(false);

    useEffect(() => {
        if (selectedClient) {
            setName(selectedClient.name);
            setAge(selectedClient.age);
            setSubscription(selectedClient.subscription);
            setEmployment(selectedClient.employment);
        } else {
            setName('');
            setAge(0);
            setSubscription('Subscribed');
            setEmployment(false);
        }
    }, [selectedClient]);

    function handleInsert() {
        const newClient = { name, age, subscription, employment };
        addClient(newClient);
        setName('');
        setAge(0);
        setSubscription('Subscribed');
        setEmployment(false);
    }

    function handleSave() {
        if (selectedClient) {
            const updatedClient: Client = { name, age, subscription, employment };
            updateClient(clients.indexOf(selectedClient), updatedClient);
            setSelectedClient(null); // Выход из режима редактирования после сохранения
        }
    }

    function handleModeChange(checked: boolean) {
        setDayMode(checked);
    }

    function handleDelete() {
        if (selectedClient) {
            removeClient(clients.indexOf(selectedClient));
            setSelectedClient(null); // Выход из режима редактирования после удаления
        }
    }

    return (
        <div className={`insert__row-container ${dayMode ? 'dark-theme' : ''}`}>
            <label className={`insert__row-label ${dayMode ? 'dark-theme' : ''}`}>Insert Row</label>
            <div className="insert__row-name">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div className={`insert__row-age ${dayMode ? 'dark-theme' : ''}`}>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="Age"
                />
                <button onClick={() => setAge(+age + 1)}><img src={UpIcon} alt="Raise"/></button>
                <button onClick={() => setAge(+age - 1)}><img src={DownIcon} alt="Lower"/></button>
            </div>
            <div className="insert__row-subscription">
                <select value={subscription} onChange={(e) => setSubscription(e.target.value)}>
                    <option value="Subscribed">Subscribed</option>
                    <option value="Not Subscribed">Not Subscribed</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="insert__row-checkbox-container">
                <input
                    type="checkbox"
                    id="employment-checkbox"
                    checked={employment}
                    onChange={(e) => setEmployment(e.target.checked)}
                    className="insert__row-checkbox-input"
                />
                <label htmlFor="employment-checkbox" className="insert__row-checkbox-label">
                    <span className="insert__row-checkmark" />
                </label>
                <p>Employed</p>
            </div>
            <div className="insert__row-btn">
                {selectedClient ? (
                    <>
                        <button onClick={handleSave} className={`insert__row-btn-add ${dayMode ? 'dark-theme' : ''}`}>
                            Save
                        </button>
                    </>
                ) : (
                    <button onClick={handleInsert} className={`insert__row-btn-add ${dayMode ? 'dark-theme' : ''}`}>
                        Insert
                    </button>
                )}
            </div>
            <hr className="insert__row-line" />
            <div className="insert__row-switch">
                <Switch
                    onChange={handleModeChange}
                    checked={dayMode}
                    onColor="#008000" // Цвет для дня
                    offColor="#808080" // Цвет для ночи
                    checkedIcon={false} // Отключаем иконку при включенном состоянии
                    uncheckedIcon={false} // Отключаем иконку при выключенном состоянии
                    className="insert__row-switcher"
                />
                <p>Mode</p>
            </div>
            <button
                style={selectedClient ? {backgroundColor: "red", color: "white"} : {backgroundColor: "lightgray"}}
                onClick={handleDelete}
                className={`insert__row-btn-add ${dayMode ? 'dark-theme' : ''}`}
            >
                Delete
            </button>
        </div>
    );
}

export default InsertRow;