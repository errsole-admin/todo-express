const express = require('express');
const tasksController = require('../controllers/tasks.js');

const router = express.Router();

router.get('/', tasksController.findAll);

router.post('/', tasksController.create);

router.put('/:id', tasksController.update);

router.patch('/:id/toggle', tasksController.toggle);

router.delete('/:id', tasksController.delete);

module.exports = router;
