import React from 'react';
import { Pedido } from './PaginaPrincipal';
import { order } from '../api/order';
import { ChartNoAxesCombined } from 'lucide-react';
import { limparData } from '../functions/limparData';
import Loading from '../components/Loading';

const Transacoes = () => {
  const [orders, setOrders] = React.useState<Pedido[]>();
  React.useEffect(() => {
    async function getOrders() {
      const data = await order.All();
      setOrders(data);
    }
    getOrders();
  }, []);
  return (
    <div className="max-h-table overflow-scroll">
      <table className="min-w-full border shadow ">
        <thead>
          <tr className="bg-zinc-200 ">
            <th className="py-2" title="Situação">
              #
            </th>
            <th>Id</th>
            <th>Id da Sessão</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>

        {orders ? (
          <tbody>
            {orders.map((pedido, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? 'bg-gray-300 text-gray-950'
                    : ' text-gray-600'
                }`}
              >
                <td className="px-4 py-2 flex items-center justify-center">
                  <ChartNoAxesCombined color="green" />
                </td>
                <td className="text-center">{pedido.id}</td>
                <td className="text-center">
                  {pedido.sessionId.substring(0, 20)}
                </td>
                <td className="text-center">R$ {pedido.amount_total / 100}</td>
                <td className="text-center">{limparData(pedido.created_at)}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <Loading />
        )}
      </table>
    </div>
  );
};

export default Transacoes;
