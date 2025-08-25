
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_CLIENTS, MOCK_TRAININGS } from '../constants';
import { ClientStatus, TrainingStatus } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
);

const Dashboard: React.FC = () => {

    const trainingStatusData = useMemo(() => {
        const statusCounts = MOCK_TRAININGS.reduce((acc, training) => {
            acc[training.status] = (acc[training.status] || 0) + 1;
            return acc;
        }, {} as Record<TrainingStatus, number>);

        return Object.entries(statusCounts).map(([name, value]) => ({ name, capacitaciones: value }));
    }, []);

    const activeClients = MOCK_CLIENTS.filter(c => c.status === ClientStatus.ACTIVE).length;
    const trainingsInProgress = MOCK_TRAININGS.filter(t => t.status === TrainingStatus.IN_PROGRESS).length;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total de Clientes" value={MOCK_CLIENTS.length} description="Clientes registrados" />
                <StatCard title="Clientes Activos" value={activeClients} description="Actualmente en producción" />
                <StatCard title="Capacitaciones Totales" value={MOCK_TRAININGS.length} description="Historial de capacitaciones" />
                <StatCard title="En Progreso" value={trainingsInProgress} description="Capacitaciones actuales" />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Estado de Capacitaciones</h2>
                <div style={{ width: '100%', height: 300 }}>
                     <ResponsiveContainer>
                        <BarChart
                            data={trainingStatusData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} itemStyle={{ color: '#fff' }}/>
                            <Legend />
                            <Bar dataKey="capacitaciones" fill="#1E40AF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;