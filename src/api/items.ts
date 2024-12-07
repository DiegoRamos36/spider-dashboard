import { apiUrl } from './config';

async function New(
  nome: string,
  desc: string,
  preco: string,
  quantidade: string,
  slug: string,
  imgSrc: string,
  imgAlt: string,
) {
  try {
    const response = await fetch(`${apiUrl}/novo-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        desc,
        preco,
        quantidade,
        slug,
        imgSrc,
        imgAlt,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function All() {
  try {
    const response = await fetch(`${apiUrl}/obter-item`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function ByName(name: string) {
  try {
    const response = await fetch(`${apiUrl}/obter-item-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.json();

    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function Delete(id: string) {
  try {
    const response = await fetch(`${apiUrl}/delete-item`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function Edit(id: string, name: string, price: number, desc: string) {
  if (!id || Number(id) <= 0) throw new Error('Insira o id do item!1');
  try {
    const response = await fetch(`${apiUrl}/edit-item`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
        price: price,
        desc: desc,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return `${error instanceof Error ? error.message : 'Erro Desconhecido!'}`;
  }
}

export const Item = { New, All, ByName, Delete, Edit };
