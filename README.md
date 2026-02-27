# 📦 Product Control

Sistema completo de controle de estoque e vendas desenvolvido com Next.js 16, TypeScript e Prisma. Solução moderna e eficiente para gestão de produtos e registro de vendas.

---

## 📋 Sobre o Projeto

**Product Control** é um sistema web de gerenciamento de estoque que permite controlar produtos, realizar vendas e acompanhar o desempenho do negócio através de dashboards intuitivos. Desenvolvido com foco em performance, usabilidade e escalabilidade.

---

## ✨ Funcionalidades

### 📦 Gestão de Produtos
- ➕ Cadastro de novos produtos
- ✏️ Edição de produtos existentes
- 🗑️ Exclusão de produtos
- 📊 Controle de quantidade em estoque
- 💰 Gerenciamento de preços

### 💳 Registro de Vendas
- 🛒 Sistema de vendas integrado
- 📉 Atualização automática de estoque
- 💵 Cálculo de totais e subtotais
- 🧾 Histórico de vendas

### 📊 Dashboard (Em Desenvolvimento)
- 📈 Visualização de métricas de vendas
- 📉 Análise de estoque
- 💹 Relatórios de desempenho
- 📅 Estatísticas por período

### 🎨 Interface
- 🌓 Tema claro/escuro
- 📱 Design responsivo
- ⚡ Validação em tempo real
- 🎯 UX intuitiva

---

## 🛠️ Stack Tecnológica

**Frontend**
- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui (Radix UI)
- Lucide Icons
- React Hook Form + Zod
- TanStack Table

**Backend**
- Next.js API Routes
- Prisma ORM
- PostgreSQL

**Ferramentas**
- Docker & Docker Compose
- ESLint & Prettier
- Bundle Analyzer

---

## 🚀 Tecnologias

<div style="display: inline_block"><br>
  <img align="center" alt="Next" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg">
  <img align="center" alt="React" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg">
  <img align="center" alt="TypeScript" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
  <img align="center" alt="Prisma" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg">
  <img align="center" alt="PostgreSQL" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
  <img align="center" alt="TailwindCSS" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg">
  <img align="center" alt="Docker" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg">
</div>


## 🎯 Principais Dependências

| Biblioteca | Versão | Descrição |
|-----------|--------|-----------|
| Next.js | 16.1.6 | Framework React fullstack |
| TypeScript | 5.x | Tipagem estática |
| Prisma | 6.19.2 | ORM para PostgreSQL |
| Tailwind CSS | 3.4.1 | Framework CSS utility-first |
| React Hook Form | 7.71.1 | Gerenciamento de formulários |
| Zod | 4.3.6 | Validação de schemas |
| TanStack Table | 8.21.3 | Tabelas interativas |
| Radix UI | - | Componentes acessíveis |
| Sonner | 2.0.7 | Toast notifications |
| Next Themes | 0.4.6 | Sistema de temas |

---

## 📥 Instalação

### Pré-requisitos
- Node.js 20 ou superior
- Docker & Docker Compose
- npm, yarn, pnpm ou bun

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/LuisG-santos/Product-Control.git
cd Product-Control
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure o banco de dados**
```bash
# Suba o container PostgreSQL
docker-compose up -d

# Execute as migrations do Prisma
npx prisma migrate dev

# Gere o Prisma Client
npx prisma generate
```

4. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
touch .env
```

Adicione as seguintes variáveis:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/product_control?schema=public"
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

---

## 🗄️ Estrutura do Projeto

```
Product-Control/
├── app/                    # App Router do Next.js
│   ├── (pages)/           # Páginas da aplicação
│   │   ├── products/      # Gestão de produtos
│   │   ├── sales/         # Registro de vendas
│   │   └── dashboard/     # Dashboard (em desenvolvimento)
│   ├── api/               # API Routes
│   └─   layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Shadcn/ui)
│   ├── products/         # Componentes de produtos
│   └── sales/            # Componentes de vendas
├── lib/                  # Utilitários e configurações
├── prisma/               # Schema e migrations
│   ├── schema.prisma     # Modelo do banco
│   └── migrations/       # Histórico de migrations
├── public/               # Arquivos estáticos
├── types/                # Tipos TypeScript
└── docker-compose.yml    # Configuração Docker
```

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor de desenvolvimento

# Produção
npm run build         # Gera build otimizado
npm run start         # Inicia servidor de produção

# Qualidade de código
npm run lint          # Executa ESLint

# Prisma
npx prisma studio     # Abre interface visual do banco
npx prisma generate   # Gera Prisma Client
npx prisma migrate dev # Cria/aplica migrations
```

---

## 🗃️ Modelo de Dados

### Entidades Principais

**Product (Produto)**
- ID único
- Nome
- Descrição
- Preço
- Quantidade em estoque
- Categoria
- Data de criação/atualização

**Sale (Venda)**
- ID único
- Produtos vendidos
- Quantidade
- Total da venda
- Data da venda

## 🎨 Componentes UI

Utilizando **Shadcn/ui** com componentes do **Radix UI**:

- ✅ **Alert Dialog** - Confirmações de ações
- ✅ **Dialog/Modal** - Formulários e detalhes
- ✅ **Dropdown Menu** - Menus de ações
- ✅ **Form Controls** - Inputs, selects, etc
- ✅ **Data Tables** - Listagem de produtos e vendas
- ✅ **Toast (Sonner)** - Notificações
- ✅ **Switch** - Alternância de tema

---

## 🚀 Roadmap

### ✅ Concluído
- [x] Sistema de cadastro de produtos
- [x] Edição de produtos
- [x] Sistema de vendas
- [x] Tema claro/escuro

### 🚧 Em Desenvolvimento
- [ ] Dashboard com métricas
- [ ] Gráficos de vendas
- [ ] Relatórios de estoque

### 📋 Planejado
- [ ] Histórico detalhado de movimentações
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações de estoque baixo
- [ ] PWA

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👤 Autor

**Luis Gustavo**

<div>
  <a href="mailto:luisgustavo.nunes@icloud.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="https://www.linkedin.com/in/luisgustavo-nunes" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/LuisG-santos" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</div>
  
</div>
