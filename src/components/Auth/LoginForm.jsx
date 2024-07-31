import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label>Contraseña: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit">Iniciar Sesion</button>

      {isLoading && triggerFetch && (<p>Cargando...</p>)}
      {isError && <p>Error al cargar los datos.</p>}
      {data && (<p>{`Token obtenido: ${data.token}`}</p>)}

    </form>
  );
};

export default LoginForm;