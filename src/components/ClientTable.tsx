import React from 'react';
import { useClientContext } from './ClientContext.tsx';

function ClientTable() {
    const { clients, dayMode, setSelectedClient } = useClientContext();

    return (
        <div className={`client__table-container ${dayMode ? 'dark-theme' : ''}`}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Subscription</th>
                    <th>Employment</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={index} onClick={() => setSelectedClient(client)}>
                        <td className='td'>
                           {client.name}
                        </td>
                        <td className='td'>
                            {client.age}
                        </td>
                        <td className='td'>
                            {client.subscription}
                        </td>
                        <td className='td'>
                            {client.employment ? 'Employed' : 'Unemployed'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientTable;
