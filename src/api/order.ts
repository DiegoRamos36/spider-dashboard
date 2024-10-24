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

async function Today() {
  const today = new Date();
  const dataFormatada = today.toISOString();
  try {
    const response = await fetch(`${apiUrl}/delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: dataFormatada,
      }),
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
async function Yesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dataFormatada = yesterday.toISOString();
  try {
    const response = await fetch(`${apiUrl}/delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: dataFormatada,
      }),
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

export const order = { All, Today, Yesterday };
