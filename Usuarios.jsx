import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/usuarios';

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
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', background: '#f4f6f8', color: '#333', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ color: '#2c3e50' }}>Usuários</h1>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
        {usuarios.map(usuario => (
          <li key={usuario._id} style={{ background: '#fff', padding: '1rem', marginBottom: '0.5rem', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{`Nome: ${usuario.nome}, Email: ${usuario.email}`}</span>
            <button
              onClick={() => apagarUsuario(usuario._id)}
              style={{
                backgroundColor: '#e74c3c',
                padding: '0.3rem 0.7rem',
                borderRadius: 6,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: 8,
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#e74c3c')}
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Adicionar Usuário</h2>
      <form onSubmit={adicionarUsuario} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{ padding: '0.7rem', flex: '1 1 45%', borderRadius: 6, border: '1px solid #ccc' }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '0.7rem', flex: '1 1 45%', borderRadius: 6, border: '1px solid #ccc' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            flex: '1 1 100%',
            marginTop: '1rem',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#2980b9')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#3498db')}
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}