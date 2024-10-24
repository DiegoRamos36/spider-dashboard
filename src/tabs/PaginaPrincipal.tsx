import { order as Pedidos } from '../api/order';
import { Item } from '../api/items';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { limparData } from '../functions/limparData';

export type Item = {
  desc: string;
  id: number;
  imgAlt: string;
  imgSrc: string;
  name: string;
  price: number;
};

export type Pedido = {
  amount_total: number;
  created_at: string;
  id: number;
  sessionId: string;
  payment_status: string;
};

type PedidoAgrupado = {
  days: string;
  total: number;
};

const PaginaPrincipal = () => {
  const [products, setProducts] = React.useState<Item[] | null>(null);
  const [order, setOrders] = React.useState<Pedido[]>([]);

  React.useEffect(() => {
    async function getProducts() {
      const data = await Item.All();
      setProducts(data);
    }
    getProducts();
  }, []);

  React.useEffect(() => {
    async function getOrders() {
      const data = await Pedidos.All();
      setOrders(data);
    }
    getOrders();
  }, []);

  const agruparPorData = (order: Pedido[]) => {
    if (!Array.isArray(order)) {
      console.error('pedidos não é um array ou está indefinido:', order);
      return [];
    }
    return order.reduce((acc, pedido) => {
      const dia = limparData(pedido.created_at);

      if (!acc[dia]) {
        acc[dia] = {
          days: dia,
          total: pedido.amount_total,
        };
      } else {
        acc[dia].total += pedido.amount_total / 100;
      }

      return acc;
    }, {} as Record<string, PedidoAgrupado>);
  };

  const pedidosAgrupados = Object.values(agruparPorData(order));

  console.log(pedidosAgrupados);

  return (
    <section className="w-11/12 mx-auto">
      <h2 className="font-bold text-gray-600 text-2xl">
        Seus principais produtos
      </h2>
      <p className="h-line border w-full mt-2 mb-4"></p>

      <ul className="flex gap-4 mb-4">
        {products
          ? products.map((product) => (
              <li key={product.id}>
                <img
                  src={product.imgSrc}
                  alt={product.imgAlt}
                  width={100}
                  height={100}
                />
                <p>{product.name}</p>
              </li>
            ))
          : ''}
      </ul>

      <h2 className="font-bold text-gray-600 text-2xl">Hoje</h2>
      <p className="h-line border w-full mt-2 mb-4"></p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={pedidosAgrupados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="days" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />{' '}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default PaginaPrincipal;
