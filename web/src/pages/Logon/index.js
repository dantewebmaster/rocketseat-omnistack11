import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';

import './styles.css';
import api from '../../services/api';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      const ong = {
        name: response.data.name,
        id,
      };

      localStorage.setItem('ong', JSON.stringify(ong));
      history.push('/profile');
    } catch (error) {
      alert(`Falha no login: ${error}`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={({ target }) => setId(target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="button-link" to="/register">
            <FiLogIn color="#e02041" size={16} /> Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={HeroesImg} alt="Heroes" />
    </div>
  )
}
