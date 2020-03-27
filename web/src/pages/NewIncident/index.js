import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', payload);

      history.push('/profile')
    } catch (error) {
      alert(`Erro ao cadastrar caso: ${error}`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={Logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="button-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
