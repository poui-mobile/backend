const swaggerUi = require('swagger-ui-express');

const schemas = {
  Cliente: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Empresa XPTO' },
      email: { type: 'string', example: 'contato@xpto.com' },
      telefone: { type: 'string', example: '+55 11 99999-0000' },
      created_at: { type: 'string', format: 'date-time' }
    }
  },
  Produto: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Consultoria Mensal' },
      descricao: { type: 'string', example: 'Pacote de consultoria recorrente' },
      created_at: { type: 'string', format: 'date-time' }
    }
  },
  TabelaPreco: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Tabela 2026' },
      produto_id: { type: 'integer', example: 1 },
      valor: { type: 'number', format: 'float', example: 1500.9 },
      created_at: { type: 'string', format: 'date-time' }
    }
  },
  Contrato: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      cliente_id: { type: 'integer', example: 1 },
      numero: { type: 'string', example: 'CTR-2026-0001' },
      data_inicio: { type: 'string', format: 'date', example: '2026-01-01' },
      data_fim: { type: 'string', format: 'date', example: '2026-12-31' },
      status: { type: 'string', example: 'ativo' },
      created_at: { type: 'string', format: 'date-time' }
    }
  },
  ItemContrato: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      contrato_id: { type: 'integer', example: 1 },
      produto_id: { type: 'integer', example: 1 },
      tabela_preco_id: { type: 'integer', example: 1 },
      quantidade: { type: 'integer', example: 2 },
      valor_unitario: { type: 'number', format: 'float', example: 1500.9 },
      created_at: { type: 'string', format: 'date-time' }
    }
  }
};

const buildCrudPaths = (resource, schemaName, tag) => ({
  [`/api/${resource}`]: {
    get: {
      tags: [tag],
      summary: `Lista ${tag.toLowerCase()}`,
      responses: {
        200: {
          description: 'Lista de registros',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: `#/components/schemas/${schemaName}` } }
            }
          }
        }
      }
    },
    post: {
      tags: [tag],
      summary: `Cria ${tag.slice(0, -1).toLowerCase()}`,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: `#/components/schemas/${schemaName}` }
          }
        }
      },
      responses: {
        201: {
          description: 'Registro criado',
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${schemaName}` }
            }
          }
        }
      }
    }
  },
  [`/api/${resource}/{id}`]: {
    get: {
      tags: [tag],
      summary: `Busca ${tag.slice(0, -1).toLowerCase()} por ID`,
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      responses: {
        200: {
          description: 'Registro encontrado',
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${schemaName}` }
            }
          }
        },
        404: { description: 'Não encontrado' }
      }
    },
    put: {
      tags: [tag],
      summary: `Atualiza ${tag.slice(0, -1).toLowerCase()}`,
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: `#/components/schemas/${schemaName}` }
          }
        }
      },
      responses: {
        200: {
          description: 'Registro atualizado',
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${schemaName}` }
            }
          }
        },
        404: { description: 'Não encontrado' }
      }
    },
    delete: {
      tags: [tag],
      summary: `Remove ${tag.slice(0, -1).toLowerCase()}`,
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      responses: {
        204: { description: 'Registro removido' }
      }
    }
  }
});

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Contratos com Supabase',
    version: '1.0.0',
    description: 'CRUD para clientes, produtos, tabela de preços, contratos e itens de contratos.'
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: { schemas },
  paths: {
    ...buildCrudPaths('clientes', 'Cliente', 'Clientes'),
    ...buildCrudPaths('produtos', 'Produto', 'Produtos'),
    ...buildCrudPaths('tabelas-precos', 'TabelaPreco', 'TabelasPrecos'),
    ...buildCrudPaths('contratos', 'Contrato', 'Contratos'),
    ...buildCrudPaths('itens-contratos', 'ItemContrato', 'ItensContratos')
  }
};

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = { setupSwagger };
