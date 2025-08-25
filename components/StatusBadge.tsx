
import React from 'react';
import { TrainingStatus } from '../types';
import { STATUS_COLORS } from '../constants';

interface StatusBadgeProps {
    status: TrainingStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
    
    return (
        <span className={`px-2 py-1 text-xs font-semibold leading-5 rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;