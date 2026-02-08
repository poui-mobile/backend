const express = require('express');
const { createCrudController } = require('../controllers/crudControllerFactory');

const createCrudRouter = (table) => {
  const router = express.Router();
  const controller = createCrudController(table);

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
};

module.exports = { createCrudRouter };
