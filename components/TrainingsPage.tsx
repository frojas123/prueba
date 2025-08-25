
import React, { useState, useMemo } from 'react';
import { Training, TrainingStatus } from '../types';
import { MOCK_TRAININGS } from '../constants';
import StatusBadge from './StatusBadge';

const TrainingsPage: React.FC = () => {
    const [trainings] = useState<Training[]>(MOCK_TRAININGS);
    const [statusFilter, setStatusFilter] = useState<string>('ALL');

    const filteredTrainings = useMemo(() => {
        if (statusFilter === 'ALL') {
            return trainings;
        }
        return trainings.filter(training => training.status === statusFilter);
    }, [trainings, statusFilter]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Capacitaciones</h1>
                {/* <button className="px-4 py-2 text-white bg-primary rounded-md hover:bg-blue-700">
                    Nueva Capacitación
                </button> */}
            </div>

            <div className="mb-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="ALL">Todos los Estados</option>
                    {Object.values(TrainingStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Fecha Agendada</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asignado a</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredTrainings.map(training => (
                            <tr key={training.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{training.clientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{training.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{training.scheduledDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={training.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{training.assignedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainingsPage;