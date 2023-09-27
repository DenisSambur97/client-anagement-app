import React, { useState } from 'react';
import { useClientContext } from './ClientContext';
import { BsPencil, BsTrash, BsCheck } from 'react-icons/bs';

function ClientTable() {
    const { clients, removeClient, updateClient, dayMode } = useClientContext();
    const [editedClients, setEditedClients] = useState([]);

    // Обработчик для кнопки удаления клиента
    function handleRemove(index) {
        removeClient(index);
    }

    // Обработчик для кнопки редактирования клиента
    function handleEdit(index) {
        // Создаем копию массива editedClients и устанавливаем флаг редактирования для клиента по индексу
        const updatedEditedClients = [...editedClients];
        updatedEditedClients[index] = true;
        setEditedClients(updatedEditedClients);
    }

    // Обработчик для сохранения изменений
    function handleSave(index, editedClient) {
        updateClient(index, editedClient);
        // Сбрасываем флаг редактирования для клиента по индексу
        const updatedEditedClients = [...editedClients];
        updatedEditedClients[index] = false;
        setEditedClients(updatedEditedClients);
    }

    // Обработчик для изменения полей клиента
    function handleEditClientField(index, field, value) {
        const editedClient = { ...clients[index] };
        editedClient[field] = value;
        const updatedClients = [...clients];
        updatedClients[index] = editedClient;
        updateClient(index, editedClient);
    }

    return (
        <div className={`client__table-container ${dayMode ? 'dark-theme' : ''}`}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Subscription</th>
                    <th>Employment</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td className='td'>
                            {editedClients[index] ? (
                                <input
                                    type="text"
                                    value={client.name}
                                    onChange={(e) => handleEditClientField(index, 'name', e.target.value)}
                                />
                            ) : (
                                client.name
                            )}
                        </td>
                        <td className='td'>
                            {editedClients[index] ? (
                                <input
                                    type="text"
                                    value={client.age}
                                    onChange={(e) => handleEditClientField(index, 'age', e.target.value)}
                                />
                            ) : (
                                client.age
                            )}
                        </td>
                        <td className='td'>
                            {editedClients[index] ? (
                                <select
                                    value={client.subscription}
                                    onChange={(e) => handleEditClientField(index, 'subscription', e.target.value)}
                                >
                                    <option value="Subscribed">Subscribed</option>
                                    <option value="Not Subscribed">Not Subscribed</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                client.subscription
                            )}
                        </td>
                        <td className='td'>
                            {editedClients[index] ? (
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={client.employment}
                                        onChange={(e) => handleEditClientField(index, 'employment', e.target.checked)}
                                    />
                                    Employed
                                </label>
                            ) : (
                                client.employment ? 'Employed' : 'Unemployed'
                            )}
                        </td>
                        <td>
                            {editedClients[index] ? (
                                <>
                                    <button onClick={() => handleSave(index, client)}><BsCheck /></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEdit(index)}><BsPencil /></button>
                                    <button onClick={() => handleRemove(index)}><BsTrash /></button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientTable;
