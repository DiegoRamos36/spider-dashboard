import React from 'react';
import { Item as Product } from './PaginaPrincipal';
import { Item } from '../api/items';

const Catalogo = () => {
  const [products, setProducts] = React.useState<Product[]>();

  React.useEffect(() => {
    async function getProducts() {
      const data = await Item.All();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div className="max-h-table overflow-scroll">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:gap-0 lg:grid-cols-4 gap-y-4">
        {products
          ? products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col border text-gray-700 shadow"
              >
                <img
                  src={product.imgSrc}
                  alt={product.imgAlt}
                  className="rounded-ss rounded-se"
                />
                <div className="flex justify-between p-2">
                  <p className="font-bold">{product.name}</p>
                  <p className="font-bold">R$ {product.price}</p>
                </div>
                <p className="text-base text-center">{product.desc}</p>
              </li>
            ))
          : ''}
        {products
          ? products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col border text-gray-700 shadow"
              >
                <img
                  src={product.imgSrc}
                  alt={product.imgAlt}
                  className="rounded-ss rounded-se"
                />
                <div className="flex justify-between p-2">
                  <p className="font-bold">{product.name}</p>
                  <p className="font-bold">R$ {product.price}</p>
                </div>
                <p className="text-base text-center">{product.desc}</p>
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
};

export default Catalogo;
