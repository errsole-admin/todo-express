const { Sequelize } = require('sequelize');

const db = require('../models');
const Task = db.Task;

exports.findAll = async (req, res) => {
  const result = await Task.findAll();
  res.send(result);
};

exports.create = async (req, res) => {
  const result = await Task.create({ name: req.body.name });
  res.status(201).send(result);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const result = await Task.update({
    name: req.body.name,
    isDone: false
  }, {
    where: { id: id }
  });
  if (result[0] === 1) {
    const taskRow = await Task.findByPk(id);
    res.send(taskRow);
  } else {
    res.status(400).send(`Could not update the task with id=${id}. Maybe the task was not found, or req.body is empty.`);
  }
};

exports.toggle = async (req, res) => {
  const id = req.params.id;
  await Task.update({
    isDone: Sequelize.literal('NOT is_done')
  }, {
    where: { id: id }
  });
  const taskRow = await Task.findByPk(id);
  res.send(taskRow);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Task.destroy({
    where: { id: id }
  });
  res.status(204).send();
};
