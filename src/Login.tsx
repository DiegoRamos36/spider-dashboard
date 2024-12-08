import React from 'react';
import logoSpider from './assets/logo-spider.webp';
import { useNotification } from './hooks/useNotification';
import { Employee } from './api/employee';
import { useLogged } from './hooks/useLogged';
import { useNavigate } from 'react-router';
import { cookie } from './api/cookie';

const Login = () => {
  const [username, setUsername] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [isRemember, setRemember] = React.useState(false);
  const { fail, success } = useNotification();
  const { login } = useLogged();
  const navigate = useNavigate();
  const supervisor = 'wa.me/+5521981734706';

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!username || !password) return fail('Usuário ou senha incorreto!');
    const data = await Employee.Auth(username, password);

    if (typeof data === 'object' && 'error' in data) {
      return fail(data.error || 'Usuário ou senha incorreto!');
    }
    login();

    if (typeof data === 'string') cookie.setAuthTokenCookie(data, 365);

    success('Usuário autenticado com sucesso!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <section className="bg-[url('./assets/fundo.webp')] bg-cover bg-right h-screen py-10  ">
      <div className="w-5/12 mx-auto  items-center  ">
        <img src={logoSpider} alt="Logo Spider" className="w-32 mb-10" />
        <form
          onSubmit={handleLogin}
          className="flex flex-col p-12 gap-4 bg-white rounded-lg font-text shadow-xl"
        >
          <h1 className="text-2xl text-gray-800 font-bold ">
            Acesse sua conta
          </h1>
          <label htmlFor="username" className=" font-bold mt-2 mb-4 px-2">
            <p className="text-md mb-2 text-gray-700">Usuário</p>
            <input
              type="text"
              name="username"
              id="username"
              className="text-lg font-normal border w-full shadow rounded px-2 py-1"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>

          <label htmlFor="password" className="font-bold mt-2 mb-4 px-2">
            <p className="text-md mb-2 text-gray-700">Senha</p>
            <input
              type="password"
              name="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              className="text-lg font-normal border w-full shadow rounded px-2 py-1"
            />
          </label>

          <label htmlFor="remember" className="flex gap-2 mt-2 mb-4 px-2">
            <input
              type="checkbox"
              checked={isRemember}
              onChange={({ target }) => setRemember(target.checked)}
            />{' '}
            <p className="text-md font-bold text-gray-600">
              Lembrar de mim neste dispositivo
            </p>
          </label>

          <button
            type="submit"
            className="bg-primary p-2 font-text text-lg rounded font-bold mb-2"
          >
            Entrar
          </button>
          <a
            href={supervisor}
            className="text-sm text-center text-blue-700 font-bold cursor-pointer"
          >
            Perdeu sua senha? Entre em contato com o supervisor.
          </a>
        </form>
      </div>
    </section>
  );
};

export default Login;
