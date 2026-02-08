create table if not exists clientes (
  id bigserial primary key,
  nome text not null,
  email text,
  telefone text,
  created_at timestamptz not null default now()
);

create table if not exists produtos (
  id bigserial primary key,
  nome text not null,
  descricao text,
  created_at timestamptz not null default now()
);

create table if not exists tabelas_precos (
  id bigserial primary key,
  nome text not null,
  produto_id bigint not null references produtos(id) on delete restrict,
  valor numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists contratos (
  id bigserial primary key,
  cliente_id bigint not null references clientes(id) on delete restrict,
  numero text not null unique,
  data_inicio date not null,
  data_fim date,
  status text not null default 'ativo',
  created_at timestamptz not null default now()
);

create table if not exists itens_contratos (
  id bigserial primary key,
  contrato_id bigint not null references contratos(id) on delete cascade,
  produto_id bigint not null references produtos(id) on delete restrict,
  tabela_preco_id bigint references tabelas_precos(id) on delete set null,
  quantidade integer not null check (quantidade > 0),
  valor_unitario numeric(12,2) not null,
  created_at timestamptz not null default now()
);
