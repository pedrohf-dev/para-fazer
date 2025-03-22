# 📌 Lista de Tarefas

Este é um projeto simples de Lista de Tarefas (To-Do List) desenvolvido com HTML, CSS e JavaScript, com um backend utilizando Node.js, Express e MongoDB. O objetivo é ajudar os usuários a gerenciar suas tarefas diárias de forma eficiente.

---

## 🚀 Funcionalidades

- ✅ Adicionar novas tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Mover tarefas concluídas para uma seção separada
- ✅ Excluir tarefas
- ✅ Persistência de dados no backend (opcional)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express
- MongoDB

---

## 📂 Estrutura do Projeto

```
Lista
├── src
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```

---

## ▶️ Como Executar o Projeto

### 🔹 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MongoDB](https://www.mongodb.com/) instalado e em execução

### 🔹 Passos para Execução

1️⃣ Clone o repositório:
```bash
git clone https://github.com/seu-usuario/lista-de-tarefas.git
cd lista-de-tarefas
```

2️⃣ Instale as dependências:
```bash
npm install
```

3️⃣ Inicie o servidor:
```bash
node server.js
```

4️⃣ Acesse a aplicação:
- Abra `index.html` no seu navegador **ou**
- Acesse `http://localhost:3000` caso esteja utilizando um servidor

---

## 📜 Estrutura do Código

### 📌 HTML (`src/index.html`)
Contém a estrutura da página, incluindo o formulário para adicionar novas tarefas e as seções para tarefas pendentes e concluídas.

### 🎨 CSS (`src/style.css`)
Define os estilos para a página, incluindo a estilização do formulário, das tarefas e dos botões.

### 🎯 JavaScript (`src/script.js`)
Gerencia a lógica para adicionar, marcar como concluída e excluir tarefas. Também inclui a lógica para persistência de dados no backend.

### 🖥️ Backend (`server.js`)
Configura o servidor Node.js com Express, definindo as rotas para salvar, atualizar e excluir tarefas no MongoDB.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.

---

✨ *Espero que este projeto seja útil para você! Divirta-se codificando!* 🚀

