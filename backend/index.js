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

// Buscar colaborador por ID
app.get('/colaboradores/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] } // Não retorna senha
    });
    
    if (!colaborador) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }
    
    res.json(colaborador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/colaboradores', async (req, res) => {
  try {
    const { nome, email, senha, cargo, departamento, data_admissao } = req.body;

    // Validações básicas
    if (!nome || nome.trim().length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    if (!senha || senha.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se e-mail já existe
    const colaboradorExistente = await Colaborador.findOne({ where: { email: email.toLowerCase().trim() } });
    if (colaboradorExistente) {
      return res.status(400).json({ error: 'E-mail já está sendo usado por outro colaborador' });
    }

    // Criar colaborador
    const colaborador = await Colaborador.create({
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      senha,
      cargo: cargo || null,
      departamento: departamento || null,
      data_admissao: data_admissao || null,
      ativo: true
    });

    const { senha: _, ...colaboradorSemSenha } = colaborador.toJSON();
    res.status(201).json({
      ...colaboradorSemSenha,
      message: 'Colaborador cadastrado com sucesso!'
    });
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

// Deletar colaborador
app.delete('/colaboradores/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findByPk(req.params.id);
    if (!colaborador) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }
    
    await colaborador.destroy();
    res.json({ message: 'Colaborador removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// ===== ROTAS ADMINISTRATIVAS =====

// Criar novo usuário
app.post('/admin/usuarios', async (req, res) => {
  try {
    const { nome, email, cargo, senha } = req.body;
    
    if (!nome || !email || !cargo || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar se email já existe
    const usuarioExistente = await Colaborador.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }
    
    // Criar usuário
    const novoUsuario = await Colaborador.create({
      nome,
      email,
      senha, // Em produção, use bcrypt para hash
      cargo
    });
    
    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      cargo: novoUsuario.cargo,
      message: 'Usuário criado com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar todos os usuários
app.get('/admin/usuarios', async (req, res) => {
  try {
    const usuarios = await Colaborador.findAll({
      attributes: ['id', 'nome', 'email', 'cargo', 'createdAt'],
      order: [['nome', 'ASC']]
    });
    
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar nova vaga
app.post('/admin/vagas', async (req, res) => {
  try {
    const { titulo, descricao, requisitos, salario, local, tipo } = req.body;
    
    if (!titulo || !descricao || !requisitos || !local) {
      return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao, requisitos, local' });
    }
    
    // Processar requisitos como array
    const requisitosArray = requisitos.split('\n').filter(r => r.trim());
    
    const novaVaga = await Vaga.create({
      titulo,
      local,
      salario: salario || 'A combinar',
      descricao,
      requisitos: requisitosArray,
      tipo: tipo || 'efetivo',
      empresa: 'Rede Alecrim',
      categoria: 'Geral',
      status: true
    });
    
    res.status(201).json({
      id: novaVaga.id,
      titulo: novaVaga.titulo,
      local: novaVaga.local,
      salario: novaVaga.salario,
      message: 'Vaga criada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Modelo para Plataformas
const Plataforma = sequelize.define('Plataforma', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
});

// Adicionar nova plataforma
app.post('/admin/plataformas', async (req, res) => {
  try {
    const { nome, url, categoria, descricao } = req.body;
    
    if (!nome || !url || !categoria) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, url, categoria' });
    }
    
    const novaPlataforma = await Plataforma.create({
      nome,
      url,
      categoria,
      descricao: descricao || ''
    });
    
    res.status(201).json({
      id: novaPlataforma.id,
      nome: novaPlataforma.nome,
      url: novaPlataforma.url,
      categoria: novaPlataforma.categoria,
      descricao: novaPlataforma.descricao,
      message: 'Plataforma adicionada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao adicionar plataforma:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar todas as plataformas
app.get('/admin/plataformas', async (req, res) => {
  try {
    const plataformas = await Plataforma.findAll({
      where: { status: true },
      order: [['categoria', 'ASC'], ['nome', 'ASC']]
    });
    
    res.json(plataformas);
  } catch (error) {
    console.error('Erro ao listar plataformas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Remover plataforma
app.delete('/admin/plataformas/:id', async (req, res) => {
  try {
    const plataforma = await Plataforma.findByPk(req.params.id);
    if (!plataforma) {
      return res.status(404).json({ error: 'Plataforma não encontrada' });
    }
    
    await plataforma.update({ status: false });
    res.json({ message: 'Plataforma removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover plataforma:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(3001, () => {
  console.log('API rodando em http://localhost:3001');
});
