const WEBHOOK_URL = 'https://n8n.srv880021.hstgr.cloud/webhook-test/JN38';

export interface MathResponse {
  response: string;
}

export async function solveMathProblem(text: string, imageFile?: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('text', text);

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MathResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling math webhook:', error);
    throw new Error('No se pudo conectar con el asistente matemático. Por favor, intenta de nuevo.');
  }
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
