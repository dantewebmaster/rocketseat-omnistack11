import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const payload = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', payload);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/')
    } catch (error) {
      alert(`Erro no cadastro: ${error}`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={Logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="button-link" to="/">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <input
            placeholder="E-mail" type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={({ target }) => setWhatsapp(target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={({ target }) => setCity(target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={({ target }) => setUf(target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
