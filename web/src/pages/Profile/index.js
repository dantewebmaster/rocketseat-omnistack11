import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import { formatMoney } from '../../utils/formatMoney';

import './styles.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ong = JSON.parse(localStorage.getItem('ong'));

  const history = useHistory();

  useEffect(() => {
    api.get('/profile').then(res => {
      setIncidents(res.data);
    })
  }, [ong.id]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`);

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert(`Erro ao deletar caso: ${error}`);
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="Be The Hero" />
        <span>Bem vinda, {ong?.name}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{formatMoney(incident.value)}</p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
