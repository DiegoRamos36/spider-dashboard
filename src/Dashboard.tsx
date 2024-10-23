import React from 'react';
import { cookie } from './api/cookie';
import { jwtDecode } from 'jwt-decode';
import {
  Book,
  Box,
  BoxesIcon,
  ChartArea,
  DollarSign,
  Home,
  LogOut,
  Truck,
  User,
  Wallet,
} from 'lucide-react';
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
  VENDAS_MENSAIS = 8,
  MAISVENDAS = 9,
}

const Dashboard = React.memo(() => {
  const token = cookie.getAuthTokenFromCookie() || '';
  const { name, cargo }: User = jwtDecode(token);
  const { logout } = useLogged();
  const [area, setArea] = React.useState(Sections.PAGINA_INICIAL);

  return (
    <section className="flex font-text text-lg">
      <nav className="h-screen px-6 py-3 border-2 shadow-lg">
        <p className="font-bold text-2xl text-gray-700 text-center">{name}</p>
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
              area === Sections.TRANSACOES ? 'text-indigo-800' : 'text-gray-700'
            } flex gap-2 items-center cursor-pointer`}
            onClick={() => setArea(Sections.TRANSACOES)}
          >
            <Wallet className="w-6 h-6 " />
            <a>Transações</a>
          </li>
          <li
            className={`${
              area === Sections.CATALOGO_PRODUTOS
                ? 'text-indigo-800'
                : 'text-gray-700'
            } flex gap-2 items-center cursor-pointer `}
            onClick={() => setArea(Sections.CATALOGO_PRODUTOS)}
          >
            <BoxesIcon className=" w-6 h-6 " />
            <a>Catálogo de produtos</a>
          </li>
          <li
            className={`${
              area === Sections.PEDIDOS ? 'text-indigo-800' : 'text-gray-700'
            } flex gap-2 items-center cursor-pointer`}
            onClick={() => setArea(Sections.PEDIDOS)}
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
                    area === Sections.ADM_ESTOQUE
                      ? 'text-indigo-800'
                      : 'text-gray-700'
                  } flex gap-2 items-center cursor-pointer`}
                  onClick={() => setArea(Sections.ADM_ESTOQUE)}
                >
                  <Truck className=" w-6 h-6" />
                  <a>Estoque</a>
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

        {cargo === 'Administrador' || cargo === 'Gerente' ? (
          <div className="mt-10 mb-2">
            <h2 className="font-bold text-xl text-gray-700 mb-2 ">
              Relatórios
            </h2>
            <ul className="flex flex-col gap-1">
              <li
                className={`${
                  area === Sections.VENDAS_MENSAIS
                    ? 'text-indigo-800'
                    : 'text-gray-700'
                } flex gap-2 items-center cursor-pointer`}
                onClick={() => setArea(Sections.VENDAS_MENSAIS)}
              >
                <ChartArea className="text-gray-700 w-6 h-6" />
                <a>Vendas Mensais</a>
              </li>
              <li
                className={`${
                  area === Sections.MAISVENDAS
                    ? 'text-indigo-800'
                    : 'text-gray-700'
                } flex gap-2 items-center cursor-pointer`}
                onClick={() => setArea(Sections.MAISVENDAS)}
              >
                <DollarSign className="text-gray-700 w-6 h-6" />
                <a>Mais vendidos</a>
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </nav>

      <section className="flex flex-col flex-grow py-3 px-6">
        <div className="flex-grow">
          <Areas tab={area} />
        </div>

        <p
          className="flex items-center gap-2  cursor-pointer border  px-2 py-1 rounded-lg shadow"
          onClick={() => logout()}
        >
          <LogOut className="text-gray-700 w-6 h-6 " />
          <p>Deslogar</p>
        </p>
      </section>
    </section>
  );
});

export default Dashboard;