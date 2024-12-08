import React from 'react';
import { cookie } from './api/cookie';
import { jwtDecode } from 'jwt-decode';
import { Book, Box, BoxesIcon, Home, User, Wallet } from 'lucide-react';
import { useLogged } from './hooks/useLogged';
import Areas from './Areas';

type User = {
  name: string;
  cargo: 'Administrador' | 'Gerente' | 'Entregador';
};

enum Sections {
  PAGINA_INICIAL = 1,
  TRANSACOES = 2,
  CATALOGO_PRODUTOS = 3,
  PEDIDOS = 4,
  ADM_PRODUTOS = 5,
  ADM_ESTOQUE = 6,
  ADM_FUNCIONARIOS = 7,
}

const Dashboard = React.memo(() => {
  const token = cookie.getAuthTokenFromCookie() || '';
  const { name, cargo }: User = jwtDecode(token);
  const { logout } = useLogged();
  const [area, setArea] = React.useState(Sections.PAGINA_INICIAL);

  return (
    <section className="flex font-text text-lg">
      <nav className="h-screen px-6 py-3 border-2 shadow-lg">
        <p className="font-bold text-2xl text-gray-700 text-center ">{name}</p>
        <p className="h-line w-full bg-gray-950 mt-2 rounded-full mb-6"></p>

        <h2 className="text-xl font-bold text-gray-700 mb-2">Visão geral</h2>
        <ul className=" flex flex-col gap-1 ">
          <li
            className={`${
              area === Sections.PAGINA_INICIAL
                ? 'text-indigo-800'
                : 'text-gray-700'
            } flex gap-2 items-center cursor-pointer`}
            onClick={() => setArea(Sections.PAGINA_INICIAL)}
          >
            <Home className="w-6 h-6 " />
            <a>Página Inicial</a>
          </li>

          <li
            className={`${
              area === Sections.CATALOGO_PRODUTOS
                ? 'text-indigo-800'
                : 'text-gray-700'
            } flex gap-2 items-center cursor-pointer text-wrap md:text-nowrap `}
            onClick={() => setArea(Sections.CATALOGO_PRODUTOS)}
          >
            <BoxesIcon className=" w-6 h-6 " />
            <a>Catálogo de produtos</a>
          </li>
          <li
            className={`${
              area === Sections.PEDIDOS ? 'text-indigo-800' : 'text-gray-400'
            } flex gap-2 items-center cursor-pointer`}
          >
            <Book className=" w-6 h-6 " />
            <a>Pedidos</a>
          </li>
          {cargo === 'Administrador' ? (
            <div>
              <h4 className="font-bold text-xl text-gray-700 mt-10 mb-2">
                Administrador
              </h4>
              <ul className="flex flex-col gap-1">
                <li
                  className={`${
                    area === Sections.ADM_PRODUTOS
                      ? 'text-indigo-800'
                      : 'text-gray-700'
                  } flex gap-2 items-center cursor-pointer`}
                  onClick={() => setArea(Sections.ADM_PRODUTOS)}
                >
                  <Box className=" w-6 h-6" />
                  <a>Produtos</a>
                </li>

                <li
                  className={`${
                    area === Sections.TRANSACOES
                      ? 'text-indigo-800'
                      : 'text-gray-700'
                  } flex gap-2 items-center cursor-pointer`}
                  onClick={() => setArea(Sections.TRANSACOES)}
                >
                  <Wallet className="w-6 h-6 " />
                  <a>Transações</a>
                </li>

                <li
                  className={`${
                    area === Sections.ADM_FUNCIONARIOS
                      ? 'text-indigo-800'
                      : 'text-gray-700'
                  } flex gap-2 items-center cursor-pointer`}
                  onClick={() => setArea(Sections.ADM_FUNCIONARIOS)}
                >
                  <User className="text-gray-700 w-6 h-6 " />
                  <a>Funcionários</a>
                </li>
              </ul>
            </div>
          ) : cargo === 'Gerente' ? (
            <li
              className={`${
                area === Sections.ADM_FUNCIONARIOS
                  ? 'text-indigo-800'
                  : 'text-gray-700'
              } flex gap-2 items-center cursor-pointer`}
              onClick={() => setArea(Sections.ADM_FUNCIONARIOS)}
            >
              <User className="text-gray-700 w-6 h-6 " />
              <a>Funcionários</a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>

      <section className="flex flex-col flex-grow py-3 px-6">
        <Areas tab={area} />

        <span>
          <button
            className="border p-2 rounded ms-4 mt-4 bg-indigo-800 text-white "
            onClick={() => logout()}
          >
            {' '}
            Deslogar
          </button>
        </span>
      </section>
    </section>
  );
});

export default Dashboard;
