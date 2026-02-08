const crudService = require('../services/crudService');

const handleError = (res, error) => {
  return res.status(500).json({
    message: 'Erro ao processar operação no Supabase.',
    details: error.message
  });
};

const createCrudController = (table) => ({
  list: async (_req, res) => {
    try {
      const data = await crudService.list(table);
      return res.json(data);
    } catch (error) {
      return handleError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await crudService.getById(table, id);
      if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado.' });
      }
      return res.json(data);
    } catch (error) {
      return handleError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const data = await crudService.create(table, req.body);
      return res.status(201).json(data);
    } catch (error) {
      return handleError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await crudService.update(table, id, req.body);
      if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado para atualização.' });
      }
      return res.json(data);
    } catch (error) {
      return handleError(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await crudService.remove(table, id);
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error);
    }
  }
});

module.exports = { createCrudController };
