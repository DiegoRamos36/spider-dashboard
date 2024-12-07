import { Pen, Plus } from 'lucide-react';
import { Employee, EmployeeData } from '../../api/employee';
import React from 'react';
import Modal from '../../components/Modal';
import { useNotification } from '../../hooks/useNotification';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const Funcionarios = () => {
  const [employees, setEmployee] = React.useState<EmployeeData[] | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const { fail, success } = useNotification();
  const [formData, setFormData] = React.useState({
    nome: '',
    endereco: '',
    username: '',
    password: '',
    cargo: 'Funcionário',
  });

  React.useEffect(() => {
    async function getEmployees() {
      const data = await Employee.All();
      setEmployee(data);
    }
    getEmployees();
  }, [employees]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (
      !formData.nome ||
      !formData.endereco ||
      !formData.username ||
      !formData.password
    ) {
      throw new Error('Preencha todos os campos!');
    }
    try {
      const data = await Employee.Create(formData);
      console.log(data);
      setFormData({
        nome: '',
        endereco: '',
        username: '',
        password: '',
        cargo: 'Funcionário',
      });
      setOpenModal(false);

      success('Funcionário cadastrado com sucesso!');
    } catch (error) {
      fail(
        `Um erro ocorreu: ${
          error instanceof Error ? error.message : 'Erro Desconhecido'
        }`,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (id <= 0 || !id) throw new Error('Insira um ID válido');
    try {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Essa ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, tenho certeza!',
        cancelButtonText: 'Não, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Employee.Delete(id);
          success('Funcionário deletado com sucesso!');
        }
      });
    } catch (error) {
      fail(
        `Um erro ocorreu: ${
          error instanceof Error ? error.message : 'Erro Desconhecido'
        }`,
      );
    }
  }

  return (
    <section>
      {employees ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4  ">
          <li
            className="flex justify-center items-center border shadow"
            onClick={() => setOpenModal(true)}
          >
            <button>
              <Plus size={40} />
            </button>
          </li>
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="border w-full me-1 rounded-md py-1 px-2 my-2 "
              />
              <input
                type="text"
                placeholder="Endereço"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="border w-full me-1 rounded-md py-1 px-2 mb-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border w-full me-1 rounded-md py-1 px-2 mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border w-full me-1 rounded-md py-1 px-2 mb-2"
              />
              <button
                className="bg-indigo-800 text-white px-2 py-1 rounded mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </Modal>
          {employees.map((employee) => (
            <li
              key={employee.id}
              className="flex flex-col border font-text shadow"
            >
              <div className="flex flex-col flex-grow">
                <p
                  className={`${
                    employee.cargo === 'Administrador'
                      ? 'text-white bg-orange-600 w-24 p-1'
                      : 'bg-blue-600 text-white w-24 p-1'
                  } font-bold text-sm`}
                >
                  {employee.cargo}
                </p>
                <h4 className="font-bold text-2xl text-center m-2">
                  {employee.nome}
                </h4>
                <p className="text-base mx-2 flex-grow">{employee.endereco}</p>

                <div className="flex justify-between items-center py-2 mx-2 mb-2 mt-2">
                  <Pen size={18} className="cursor-pointer" />
                  <p
                    className="text-red-600 underline text-base cursor-pointer"
                    onClick={() => handleDelete(employee.id)}
                  >
                    excluir funcionário
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Funcionarios;
