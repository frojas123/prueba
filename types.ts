
export enum ClientStatus {
  ACTIVE = 'Activo',
  INACTIVE = 'Inactivo',
  FROZEN = 'Congelado',
}

export enum TrainingType {
  PM = 'Capacitación PM',
  GENERAL = 'Capacitación General',
}

export enum TrainingStatus {
  SCHEDULED = 'AGENDADA',
  IN_PROGRESS = 'EN PROCESO',
  RESCHEDULED = 'REAGENDADA',
  CANCELED = 'CANCELADA',
  COMPLETED = 'COMPLETADA',
}

export interface Client {
  id: string;
  businessName: string;
  tradeName: string;
  status: ClientStatus;
  industry: string;
  connectionType: string;
  contractType: string;
  registrationDate: string;
  estimatedProductionDate: string;
  actualProductionDate?: string;
  licenses: number;
  observations: string;
  frozenInfo?: string;
}

export interface Training {
  id: string;
  clientId: string;
  clientName: string;
  type: TrainingType;
  status: TrainingStatus;
  scheduledDate: string;
  assignedTo: string;
  details: string;
}