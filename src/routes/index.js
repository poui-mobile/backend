const express = require('express');
const { createCrudRouter } = require('./crudRouteFactory');

const router = express.Router();

router.use('/clientes', createCrudRouter('clientes'));
router.use('/produtos', createCrudRouter('produtos'));
router.use('/tabelas-precos', createCrudRouter('tabelas_precos'));
router.use('/contratos', createCrudRouter('contratos'));
router.use('/itens-contratos', createCrudRouter('itens_contratos'));

module.exports = router;
