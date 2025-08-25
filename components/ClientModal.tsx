
import React, { useState, useEffect } from 'react';
import { Client, ClientStatus } from '../types';
import { generateClientSummary } from '../services/geminiService';

interface ClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
}

const initialClientState: Client = {
  id: '',
  businessName: '',
  tradeName: '',
  status: ClientStatus.ACTIVE,
  industry: '',
  connectionType: '',
  contractType: '',
  registrationDate: '',
  estimatedProductionDate: '',
  licenses: 0,
  observations: '',
};

const ClientModal: React.FC<ClientModalProps> = ({ client, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Client>(initialClientState);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData(initialClientState);
    }
    setAiSummary(''); // Reset summary when client changes
  }, [client, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateSummary = async () => {
      if (!formData) return;
      setIsGenerating(true);
      setAiSummary('');
      try {
          const summary = await generateClientSummary(formData);
          setAiSummary(summary);
      } catch (error) {
          setAiSummary('Error al generar el resumen.');
      } finally {
          setIsGenerating(false);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || new Date().toISOString() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl max-h-[90vh] p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{client ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Razón Social" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
            <input name="tradeName" value={formData.tradeName} onChange={handleChange} placeholder="Nombre de Fantasía" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
              {Object.values(ClientStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Rubro" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="connectionType" value={formData.connectionType} onChange={handleChange} placeholder="Tipo de Conexión" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="contractType" value={formData.contractType} onChange={handleChange} placeholder="Tipo de Contrato" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="registrationDate" type="date" value={formData.registrationDate} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="estimatedProductionDate" type="date" value={formData.estimatedProductionDate} onChange={handleChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="licenses" type="number" value={formData.licenses} onChange={handleChange} placeholder="Licencias" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <textarea name="observations" value={formData.observations} onChange={handleChange} placeholder="Observaciones" rows={4} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          
          {formData.status === ClientStatus.FROZEN && (
             <textarea name="frozenInfo" value={formData.frozenInfo || ''} onChange={handleChange} placeholder="Información de Congelación" rows={2} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 bg-yellow-50" />
          )}

          {client && (
            <div className="p-4 mt-4 border-t dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">Análisis con IA</h3>
                <button type="button" onClick={handleGenerateSummary} disabled={isGenerating} className="mt-2 px-4 py-2 text-sm text-white bg-secondary rounded-md disabled:bg-gray-400">
                    {isGenerating ? 'Generando...' : 'Generar Resumen Estratégico'}
                </button>
                {isGenerating && <div className="mt-2 text-sm dark:text-gray-300">Contactando a Gemini... por favor espere.</div>}
                {aiSummary && <div className="mt-4 p-4 whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 rounded-md text-sm">{aiSummary}</div>}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-white bg-primary rounded-md">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;