
import React, { useState, useMemo } from 'react';
import { Client } from '../types';
import { MOCK_CLIENTS } from '../constants';
import ClientModal from './ClientModal';

const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const filteredClients = useMemo(() =>
        clients.filter(client =>
            client.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.tradeName.toLowerCase().includes(searchTerm.toLowerCase())
        ), [clients, searchTerm]
    );

    const handleOpenModal = (client: Client | null) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    const handleSaveClient = (client: Client) => {
        setClients(prevClients => {
            const exists = prevClients.find(c => c.id === client.id);
            if (exists) {
                return prevClients.map(c => c.id === client.id ? client : c);
            }
            return [...prevClients, client];
        });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Clientes</h1>
                <button
                    onClick={() => handleOpenModal(null)}
                    className="px-4 py-2 text-white bg-primary rounded-md hover:bg-blue-700"
                >
                    Nuevo Cliente
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Razón Social</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Rubro</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Contrato</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredClients.map(client => (
                            <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{client.businessName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{client.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{client.industry}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{client.contractType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(client)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <ClientModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                client={selectedClient}
                onSave={handleSaveClient}
            />
        </div>
    );
};

export default ClientsPage;