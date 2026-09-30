const express = require('express');
const path = require('path');
const Model = require('./model');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

function validate(body) {
  const data = { ...body };
  if (typeof data.nome !== 'string' || !data.nome.trim()) return 'Nome é obrigatório';
  if (typeof data.email !== 'string' || !data.email.trim()) return 'E-mail é obrigatório';
  if (typeof data.telefone !== 'string' || !data.telefone.trim()) return 'Telefone (10 ou 11 dígitos) é obrigatório';
  
  data.nome = data.nome.trim();
  data.email = data.email.trim();
  data.telefone = data.telefone.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'E-mail inválido';
  if (!/^\d{10,11}$/.test(data.telefone)) return 'Telefone deve ter 10 ou 11 dígitos';
  return null;
}
function validId(id) { return /^[1-9]\d*$/.test(id) && Number.isSafeInteger(Number(id)); }
function failure(res, error) {
  if (error.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ erro: 'email já cadastrado' });
  return res.status(500).json({ erro: 'Erro interno' });
}

app.get('/api/contatos', async (req, res) => {
  try { res.json(await Model.findAll({ order: [['id', 'ASC']] })); }
  catch (error) { failure(res, error); }
});
app.get('/api/contatos/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Contato não encontrado' });
    res.json(item);
  } catch (error) { failure(res, error); }
});
app.post('/api/contatos', async (req, res) => {
  const errorText = validate(req.body);
  if (errorText) return res.status(400).json({ erro: errorText });
  try { res.status(201).json(await Model.create(req.body)); }
  catch (error) { failure(res, error); }
});
app.put('/api/contatos/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
  const errorText = validate(req.body);
  if (errorText) return res.status(400).json({ erro: errorText });
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Contato não encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (error) { failure(res, error); }
});
app.delete('/api/contatos/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Contato não encontrado' });
    await item.destroy();
    res.status(204).end();
  } catch (error) { failure(res, error); }
});
module.exports = app;
