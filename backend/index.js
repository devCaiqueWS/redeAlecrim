import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Modelo Vaga
const Vaga = sequelize.define('Vaga', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  local: { type: DataTypes.STRING, allowNull: false },
  salario: { type: DataTypes.STRING, allowNull: true },
  responsavel: { type: DataTypes.STRING, allowNull: true },
  empresa: { type: DataTypes.STRING, allowNull: true },
  categoria: { type: DataTypes.STRING, allowNull: true },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  beneficios: { type: DataTypes.JSON, allowNull: true },
  responsabilidades: { type: DataTypes.JSON, allowNull: true },
  requisitos: { type: DataTypes.JSON, allowNull: true },
  tipo: { type: DataTypes.STRING, allowNull: true },
  experiencias_preferenciais: { type: DataTypes.JSON, allowNull: true },
  perguntas_selecao: { type: DataTypes.JSON, allowNull: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
});

// Modelo Colaborador
const Colaborador = sequelize.define('Colaborador', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  cargo: { type: DataTypes.STRING, allowNull: true },
  departamento: { type: DataTypes.STRING, allowNull: true },
  data_admissao: { type: DataTypes.DATE, allowNull: true },
  ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
});

// Sincroniza banco
sequelize.sync();

// Rotas RESTful
app.get('/vagas', async (req, res) => {
  const vagas = await Vaga.findAll();
  res.json(vagas);
});

app.get('/vagas/:id', async (req, res) => {
  const vaga = await Vaga.findByPk(req.params.id);
  if (vaga) res.json(vaga);
  else res.status(404).json({ error: 'Vaga não encontrada' });
});

app.post('/vagas', async (req, res) => {
  try {
    const vaga = await Vaga.create(req.body);
    res.status(201).json(vaga);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/vagas/:id', async (req, res) => {
  const vaga = await Vaga.findByPk(req.params.id);
  if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });
  try {
    await vaga.update(req.body);
    res.json(vaga);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/vagas/:id', async (req, res) => {
  const vaga = await Vaga.findByPk(req.params.id);
  if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });
  await vaga.destroy();
  res.status(204).send();
});

// Rotas para Colaboradores
app.get('/colaboradores', async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll({
      attributes: { exclude: ['senha'] } // Não retorna senha
    });
    res.json(colaboradores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/colaboradores', async (req, res) => {
  try {
    const colaborador = await Colaborador.create(req.body);
    const { senha, ...colaboradorSemSenha } = colaborador.toJSON();
    res.status(201).json(colaboradorSemSenha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/colaboradores/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const colaborador = await Colaborador.findOne({ where: { email, ativo: true } });
    
    if (!colaborador || colaborador.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const { senha: _, ...colaboradorSemSenha } = colaborador.toJSON();
    res.json({ 
      success: true, 
      colaborador: colaboradorSemSenha,
      message: 'Login realizado com sucesso'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/colaboradores/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: 'Colaborador não encontrado' });
    
    await colaborador.update(req.body);
    const { senha, ...colaboradorSemSenha } = colaborador.toJSON();
    res.json(colaboradorSemSenha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/colaboradores/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: 'Colaborador não encontrado' });
    
    await colaborador.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('API rodando em http://localhost:3001');
});
