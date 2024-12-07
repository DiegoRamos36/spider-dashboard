import { apiUrl } from './config';

interface UserData {
  nome: string;
  username: string;
  password: string;
  endereco: string;
  cargo: string;
}

export interface EmployeeData {
  id: number;
  username: string;
  cargo: 'Administrador' | 'Funcionário';
  nome: string;
  endereco: string;
}

async function All() {
  try {
    const response = await fetch(`${apiUrl}/obter-todos-funcionarios`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(
        `Um erro ocorreu: ${response.status} / ${response.statusText}`,
      );
    }

    return response.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro Desconhecido' };
  }
}

async function ByName(name: string) {
  try {
    if (!name || name.length < 6) throw new Error('Nome inválido!');
    const response = await fetch(`${apiUrl}/obter-todos-funcionarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: name,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Um erro ocorreu: ${response.status} / ${response.statusText}`,
      );
    }

    return response.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro Desconhecido' };
  }
}

async function Create(formData: UserData) {
  try {
    if (
      !formData.nome ||
      !formData.username ||
      !formData.password ||
      !formData.cargo ||
      !formData.endereco
    ) {
      throw new Error('Preencha todos os Campos!!');
    }
    const response = await fetch(`${apiUrl}/registrar-funcionario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar');
    }

    return response.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro Desconhecido' };
  }
}

async function Auth(username: string, password: string) {
  try {
    if (!username || !password) {
      throw new Error('Preencha todos os Campos!!');
    }
    const response = await fetch(`${apiUrl}/autenticar-funcionario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao autenticar');
    }

    return response.text();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro Desconhecido' };
  }
}

async function Delete(id: number) {
  try {
    if (!id || id <= 0) {
      throw new Error('Insira um id válido!');
    }
    const response = await fetch(`${apiUrl}/deletar-funcionario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir');
    }

    return response.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro Desconhecido' };
  }
}

export const Employee = { All, ByName, Create, Auth, Delete };
