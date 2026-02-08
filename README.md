# Backend - Contratos com Supabase

API REST para gestão de:
- clientes
- produtos
- tabela de preços
- contratos
- itens de contratos

A API está integrada ao Supabase e publica documentação Swagger em `/docs`.

## Requisitos

- Node.js 18+
- Projeto Supabase ativo

## Configuração

1. Instale dependências:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env
```

Preencha:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (recomendado para backend)

3. Crie as tabelas no Supabase usando o SQL em:

- `supabase/schema.sql`

## Executar local

```bash
npm run dev
```

ou

```bash
npm start
```

Servidor padrão: `http://localhost:3000`

## Deploy no Vercel

Este projeto está preparado para Vercel com:
- entrada serverless em `api/index.js`
- configuração de roteamento em `vercel.json`

Passos:

1. Configure as variáveis no projeto Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. Faça deploy:

```bash
vercel
```

## Endpoints

Base URL: `/api`

- `/clientes`
- `/produtos`
- `/tabelas-precos`
- `/contratos`
- `/itens-contratos`

Cada recurso possui CRUD completo:
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Swagger

Com a API rodando, acesse:

- `/docs`

## Healthcheck

- `GET /health`
