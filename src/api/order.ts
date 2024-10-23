import { apiUrl } from './config';

async function All() {
  try {
    const response = await fetch(`${apiUrl}/pedidos`, {
      method: 'GET',
    });

    if (!response.ok)
      throw new Error(`${response.status} |  ${response.statusText}`);

    return response.json();
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Erro ao retornar pedidos!',
    };
  }
}

export const order = { All };
