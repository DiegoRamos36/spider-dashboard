import { order } from '../api/order';
import React from 'react';
import { Item } from './PaginaPrincipal';
import { inverterData } from '../functions/inverterData';
import { limparData } from '../functions/limparData';
import Loading from '../components/Loading';

type InformacaoDoPedido = {
  amountTotal: number;
  coupon: string | null;
  createdAt: Date;
  currency: 'brl';
  id: number;
  produtos: ItensDoPedido[];
  sessionId: string;
  userId: number;
};

type ItensDoPedido = {
  id: number;
  pedidoId: number;
  produto: Item;
  produtoId: number;
  quantity: number;
};

const Pedidos = () => {
  const [pedidosOntem, setPedidosOntem] = React.useState<
    InformacaoDoPedido[] | null
  >(null);
  const [pedidosHoje, setPedidosHoje] = React.useState<
    InformacaoDoPedido[] | null
  >(null);

  React.useEffect(() => {
    async function getToday() {
      const data = await order.Today();
      setPedidosHoje(data);
    }
    getToday();
  }, []);
  React.useEffect(() => {
    async function getYesterday() {
      const data = await order.Yesterday();
      setPedidosOntem(data);
    }
    getYesterday();
  }, []);

  console.log(pedidosHoje);
  return (
    <div>
      <h4>Hoje</h4>
      <p></p>

      {pedidosHoje ? (
        <ul>
          {pedidosHoje.map((pedido) => (
            <li
              key={pedido.id}
              className="flex flex-col  border-2 shadow-lg  p-4  rounded-lg justify-between"
            >
              <div className="flex justify-between mb-4 font-bold text-lg">
                <p>{inverterData(limparData(pedido.createdAt))}</p>
                <p>R$ {pedido.amountTotal / 100}</p>
              </div>
              <div className="flex flex-col flex-grow gap-4 md:gap-2 ">
                {pedido.produtos.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-xl font-terciary"
                  >
                    <img
                      src={item.produto.imgSrc}
                      alt={item.produto.imgAlt}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <p>-</p>
                    <p>{item.produto.name}</p>
                    <p>-</p>
                    <p>{item.quantity}</p>
                  </li>
                ))}
              </div>
              <div className="flex justify-between py-4">
                <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                  Ajuda
                </button>
                <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                  Reportar problema
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}

      <h4>Ontem</h4>
      <p></p>
      {pedidosOntem ? (
        <ul>
          {pedidosOntem.map((pedido) => (
            <li
              key={pedido.id}
              className="flex flex-col  border-2 shadow-lg  p-4  rounded-lg justify-between"
            >
              <div className="flex justify-between mb-4 font-bold text-lg">
                <p>{inverterData(limparData(pedido.createdAt))}</p>
                <p>R$ {pedido.amountTotal / 100}</p>
              </div>
              <div className="flex flex-col flex-grow gap-4 md:gap-2 ">
                {pedido.produtos.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-xl font-terciary"
                  >
                    <img
                      src={item.produto.imgSrc}
                      alt={item.produto.imgAlt}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <p>-</p>
                    <p>{item.produto.name}</p>
                    <p>-</p>
                    <p>{item.quantity}</p>
                  </li>
                ))}
              </div>
              <div className="flex justify-between py-4">
                <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                  Ajuda
                </button>
                <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                  Reportar problema
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Pedidos;
