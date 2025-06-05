import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:80/usuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function carregarUsuarios() {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (err) {
      alert('Erro ao carregar usuários');
      console.error(err);
    }
  }

  async function apagarUsuario(id) {
    if (!window.confirm('Tem certeza que deseja apagar este usuário?')) return;
    try {
      const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!resposta.ok) throw new Error('Erro ao apagar usuário');
      carregarUsuarios();
    } catch (err) {
      alert('Erro ao apagar usuário');
      console.error(err);
    }
  }

  async function adicionarUsuario(e) {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      alert('Por favor, preencha nome e email.');
      return;
    }
    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });
      if (!resposta.ok) throw new Error('Erro ao adicionar usuário');
      setNome('');
      setEmail('');
      carregarUsuarios();
    } catch (err) {
      alert('Erro ao adicionar usuário');
      console.error(err);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Usuários</h1>
      <ul className="userList">
        {usuarios.map(usuario => (
          <li key={usuario._id} className="userItem">
            <span>{`Nome: ${usuario.nome}, Email: ${usuario.email}`}</span>
            <button
              onClick={() => apagarUsuario(usuario._id)}
              className="deleteButton"
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>

      <h2 className="subtitle">Adicionar Usuário</h2>
      <form onSubmit={adicionarUsuario} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="inputText"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="inputText"
          required
        />
        <button type="submit" className="submitButton">
          Adicionar
        </button>
      </form>
    </div>
  );
}
