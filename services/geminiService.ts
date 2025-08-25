
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Client } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateClientSummary = async (client: Client): Promise<string> => {
  if (!API_KEY) {
    return "Error: La clave de API de Gemini no está configurada. Por favor, configure la variable de entorno API_KEY.";
  }
  
  const prompt = `
    Basado en los siguientes datos de un cliente, genera un resumen ejecutivo y una recomendación estratégica en español.
    El resumen debe ser conciso y la recomendación debe enfocarse en cómo mejorar el servicio o la relación con este cliente.
    Formato de salida:
    **Resumen Ejecutivo:**
    [Tu resumen aquí]
    
    **Recomendación Estratégica:**
    [Tu recomendación aquí]

    Datos del Cliente:
    - Razón Social: ${client.businessName}
    - Nombre de Fantasía: ${client.tradeName}
    - Estado: ${client.status}
    - Rubro: ${client.industry}
    - Tipo de Contrato: ${client.contractType}
    - Fecha de Registro: ${client.registrationDate}
    - Licencias: ${client.licenses}
    - Observaciones: ${client.observations}
    ${client.frozenInfo ? `- Información de Congelación: ${client.frozenInfo}` : ''}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error al generar el resumen: ${error.message}`;
    }
    return "Ocurrió un error desconocido al contactar la IA.";
  }
};