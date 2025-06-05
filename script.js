const API_URL = 'http://localhost/usuarios'; // Porta 80 é implícita no HTTP

async function carregarUsuarios() {
  const resposta = await fetch(API_URL);
  const usuarios = await resposta.json();
  const lista = document.getElementById('lista-usuarios');
  lista.innerHTML = '';
  usuarios.forEach(usuario => {
    const item = document.createElement('li');
    item.textContent = `Nome: ${usuario.nome}, Idade: ${usuario.idade}`;
    lista.appendChild(item);
  });
}

async function adicionarUsuario() {
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, idade })
  });

  carregarUsuarios();
}

carregarUsuarios();
