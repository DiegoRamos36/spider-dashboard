import { Item } from '../../api/items';
import React from 'react';
import { Item as Product } from '../PaginaPrincipal';
import Swal from 'sweetalert2';
import { Pen } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';
import Loading from '../../components/Loading';

const Produtos = () => {
  const [products, setProducts] = React.useState<Product[] | null>(null);
  const [itemToEdit, setItemToEdit] = React.useState<Product>();
  const [editModal, setEditModal] = React.useState(false);
  const [nameEdited, setNameEdited] = React.useState('');
  const [descEdited, setDescEdited] = React.useState('');
  const [priceEdited, setPriceEdited] = React.useState(0);
  const { fail, success } = useNotification();

  async function handleDelete(id: number) {
    if (!id) return null;

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: 'Não, cancelar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Item.Delete(String(id));
      }
    });
  }

  React.useEffect(() => {
    async function getProducts() {
      const data = await Item.All();
      setProducts(data);
    }
    getProducts();
  }, [products]);

  async function openEditModal(id: number) {
    setItemToEdit(products![id]);
    setEditModal(true);
  }

  async function handleSubmit() {
    if (!itemToEdit) return fail('Sem item para editar!');
    if (!nameEdited || !descEdited || !priceEdited)
      return fail('Preencha todos os campos!');
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: 'Não, cancelar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await Item.Edit(
          String(itemToEdit.id),
          nameEdited,
          priceEdited,
          descEdited,
        );

        setEditModal(false);
        success('Item Modificado com sucesso!');
        console.log(data);
      }
    });
  }
  return (
    <>
      <section>
        <ul className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
          {editModal ? (
            <li className="flex flex-col font-text text-gray-700  border shadow ">
              <img
                width={600}
                height={600}
                className="bg-gray-700 rounded-t-lg"
              />
              <div className="px-4">
                <h4 className="sm:text-md md:text-lg text-center my-2">
                  <input
                    placeholder={`${itemToEdit!.name}`}
                    type="text"
                    className="border rounded  border-gray-700 text-center"
                    onChange={({ target }) => setNameEdited(target.value)}
                  />
                </h4>
                <p className="flex text-base text-nowrap overflow-hidden">
                  <input
                    type="text"
                    placeholder={`${itemToEdit!.desc}`}
                    className="border rounded mx-2 border-gray-700 flex-grow"
                    onChange={({ target }) => setDescEdited(target.value)}
                  />
                </p>

                <div className="flex justify-between w-full items-center">
                  <button
                    onClick={handleSubmit}
                    className=" my-2 border border-black  rounded px-1 "
                  >
                    Alterar
                  </button>
                  <span className="flex my-2 py-1 gap-1 ">
                    <p className="flex-grow">R$:</p>{' '}
                    <input
                      type="number"
                      placeholder={`${itemToEdit!.price}`}
                      className="border rounded border-gray-700 w-12 font-bold"
                      onChange={({ target }) =>
                        setPriceEdited(Number(target.value))
                      }
                    />
                  </span>
                </div>
              </div>
            </li>
          ) : (
            ''
          )}

          {products ? (
            products.map((product, index) => (
              <li
                key={product.id}
                className="flex flex-col border font-text text-gray-700 shadow"
              >
                <img
                  className="rounded-t-lg"
                  src={product.imgSrc}
                  alt={product.imgAlt}
                />
                <div className="px-4">
                  <h4 className="font-bold text-xl text-center my-2">
                    {product.name}
                  </h4>
                  <p className="text-base text-nowrap overflow-hidden">
                    {product.desc}
                  </p>
                  <div className="flex justify-between items-center py-2 my-2">
                    <Pen
                      size={18}
                      className="cursor-pointer"
                      onClick={() => openEditModal(index)}
                    />
                    <p
                      className="text-red-600 underline text-base cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      excluir produto
                    </p>
                    <p className="text-md font-bold my-2">R$ {product.price}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <Loading />
          )}
        </ul>
      </section>
    </>
  );
};

export default Produtos;
