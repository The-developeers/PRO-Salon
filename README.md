# 💇‍♀️ Pro Salon

O **Pro Salon** é um sistema desenvolvido em **React** com o objetivo de auxiliar na **organização e gestão de agendamentos** de um salão de beleza.  
O foco inicial do projeto é oferecer uma **visão prática e moderna da agenda do dia**, mostrando de forma clara os horários, clientes e profissionais responsáveis por cada atendimento.

## 🎯 Objetivo

O principal propósito do Pro Salon é facilitar o **gerenciamento das rotinas diárias** do salão, reduzindo falhas no agendamento e otimizando o tempo dos profissionais.  
Com uma interface moderna e intuitiva, o sistema permite uma **visualização rápida dos compromissos**, mantendo a organização e o controle das atividades em tempo real.

## 🖥️ Interface e Design

A aplicação foi desenvolvida com atenção à **usabilidade e experiência do usuário (UX)**.  
A interface conta com:

- **Sidebar (menu lateral)** moderna e funcional, permitindo fácil navegação entre as seções;
- Ícones visuais para rápida identificação das áreas do sistema (como o ícone de **maleta** representando os funcionários);
- Layout limpo, com cores suaves e componentes responsivos;
- Organização visual clara, mantendo a legibilidade e o foco nas informações principais.

## ⚙️ Estrutura Inicial

Na versão atual, o Pro Salon apresenta:
- Uma **Agenda do Dia**, exibindo os agendamentos de forma organizada;
- Um **menu lateral** com seções para Dashboard, Clientes, Funcionários, Serviços, Agendamentos e Financeiro;
- Ícones representativos, utilizando a biblioteca **React Icons**;
- Estrutura modular, permitindo expansão e integração com futuras funcionalidades.

## 🧩 Tecnologias Utilizadas

### 💻 Frontend
- **React.js** – Framework principal para construção da interface;
- **TypeScript** – Tipagem estática para maior segurança e legibilidade do código;
- **React Icons** – Biblioteca de ícones moderna e completa;
- **CSS / Tailwind (ou inline styles)** – Para estilização e layout responsivo;
- **Vite** – Ferramenta de build rápida e otimizada para desenvolvimento moderno.

### ⚙️ Backend
- **Node.js** – Plataforma utilizada para o desenvolvimento do servidor;
- **Express.js** – Framework leve para criação de rotas e APIs REST;
- **MongoDB (ou outro banco NoSQL/SQL futuramente)** – Para armazenamento de dados de agendamentos, clientes e funcionários;
- **JWT / Bcrypt** – Para autenticação e segurança dos usuários (planejado para versões futuras).

## 🧠 Visão do Projeto

O **Pro Salon** foi idealizado como uma ferramenta para **profissionais da beleza** e **gestores de salões**, oferecendo um sistema leve, intuitivo e adaptável.  
Com o tempo, poderá evoluir para um **painel completo de gestão**, centralizando todas as informações de clientes, funcionários, serviços e finanças em um só lugar.

---

✨ *Projeto em desenvolvimento contínuo. Futuras versões incluirão mais funcionalidades de gestão e automação de processos.*
<<<<<<< HEAD

# **Pro Salon – Instruções de Instalação e Execução**

Este guia explica como baixar, configurar e executar o **Frontend** e o **Backend** do projeto.

---

## 🚀 **1. Baixar o Projeto**

Você pode escolher entre duas opções:

### ✔️ **Clonar o repositório (recomendado)**

```sh
git clone -b main https://github.com/The-developeers/PRO-Salon
```

### ✔️ **Ou baixar o arquivo ZIP**

1. Acesse o repositório no GitHub
2. Clique em **Code → Download ZIP**
3. Extraia o conteúdo

---

## 📁 **2. Estrutura do Projeto**

Após baixar, você terá algo assim:

```
/pro-salon/
   ├── backend/
   └── frontend/
```

---

## 📦 **3. Instalar Dependências**

### ➤ **Backend**

No diretório raiz do backend:

```sh
cd backend
npm install
```

### ➤ **Frontend**

No diretório raiz do frontend:

```sh
cd frontend
npm install
```

---

## 🔧 **4. Criar o arquivo `.env` no Backend**

Crie um arquivo `.env` dentro da pasta **backend/** contendo:

```
PORT=5000
MONGO_URI=COLE_AQUI_SUA_STRING_DO_MONGODB
NODE_ENV=development
JWT_SECRET=SUA_CHAVE_ALEATORIA_AQUI
JWT_EXPIRES=7d
URL_FRONTEND=http://localhost:5173
```

📌 **Dicas importantes:**

* `PORT` pode ser qualquer porta livre (ex: 5000)
* `MONGO_URI` deve ser a URL do seu cluster MongoDB
* `JWT_SECRET` deve ser um texto aleatório forte

---

## 🖥️ **5. Executar o Sistema**

### ▶️ **Rodar o Backend**

No diretório **backend/**:

```sh
npm run dev
```

Servidor ficará disponível em:

```
http://localhost:5000
```

---

### ▶️ **Rodar o Frontend**

No diretório **frontend/**:

```sh
npm run dev
```

A aplicação abrirá em:

```
http://localhost:5173
```

---

## 🎉 **6. Pronto!**

Agora você já pode usar o sistema Pro Salon com o frontend e backend funcionando juntos.

---
=======
>>>>>>> 4b8bd73a0e5869809df2d2b395763fb4a2a67c9f
