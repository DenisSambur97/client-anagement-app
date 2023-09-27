import React, { useState } from 'react';
import { useClientContext } from './ClientContext';
import Switch from 'react-switch';
import UpIcon from '../assets/arrow-up-1.png'
import DownIcon from '../assets/arrow-down-1.png'

function InsertRow() {
    const { addClient, setDayMode, dayMode } = useClientContext();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [subscription, setSubscription] = useState('Subscribed');
    const [employment, setEmployment] = useState(false);

    // Обработчик для кнопки Insert
    function handleInsert() {
        const newClient = { name, age, subscription, employment };
        addClient(newClient);
        // Сброс формы после добавления клиента
        setName('');
        setAge(0);
        setSubscription('Subscribed');
        setEmployment(false);
    }

    // Обработчик для переключения режима день/ночь и изменения цветовой темы
    function handleModeChange(checked) {
        setDayMode(checked);
    }

    return (
        <div className={`insert__row-container ${dayMode ? 'dark-theme' : ''}`}>
            <label className={`insert__row-label ${dayMode ? 'dark-theme' : ''}`}>Insert Row</label>
            <div className="insert__row-name">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
            </div>
            <div className={`insert__row-age ${dayMode ? 'dark-theme' : ''}`}>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age'/>
                <button onClick={() => setAge(age + 1)}>&#x02C4;</button>
                <button onClick={() => setAge(age - 1)}>&#x02C5;</button>
                {/*<button onClick={() => setAge(age + 1)}><img src={UpIcon} alt="Raise"/></button>*/}
                {/*<button onClick={() => setAge(age - 1)}><img src={DownIcon} alt="Lower"/></button>*/}
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
                    <span className="insert__row-checkmark"/>
                </label>
                <p>Employed</p>
            </div>
            <div className="insert__row-btn">
                <button onClick={handleInsert} className={`insert__row-btn-add ${dayMode ? 'dark-theme' : ''}`}>Insert</button>
            </div>
            <hr className="insert__row-line"/>
            <div className="insert__row-switch">
                <Switch
                    onChange={handleModeChange}
                    checked={dayMode}
                    onColor="#008000" // Цвет для дня
                    offColor="#808080"    // Цвет для ночи
                    checkedIcon={false} // Отключаем иконку при включенном состоянии
                    uncheckedIcon={false} // Отключаем иконку при выключенном состоянии
                    className="insert__row-switcher"
                />
                <p>Mode</p>
            </div>
            <div className="insert__row-btn">
                <button className={`insert__row-btn-add ${dayMode ? 'dark-theme' : ''}`}>Delete</button>
            </div>
        </div>
    );
}

export default InsertRow;
