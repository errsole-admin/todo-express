const express = require('express');
const tasks = require('../controllers/tasks.js');

const router = express.Router();

router.get('/', tasks.findAll);

router.post('/', tasks.create);

router.put('/:id', tasks.update);

router.patch('/:id/toggle', tasks.toggle);

router.delete('/:id', tasks.delete);

module.exports = router;
