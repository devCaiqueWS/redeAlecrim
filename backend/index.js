import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco - PostgreSQL no Render, SQLite local
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
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

// Modelo Plataforma
const Plataforma = sequelize.define('Plataforma', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: true },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
});

// Função para garantir dados essenciais sempre existam
async function ensureEssentialData() {
  try {
    // Verificar colaboradores essenciais
    const colaboradores = [
      {
        nome: 'Caíque Silva',
        email: 'caique@redealecrim.com.br',
        senha: '123456',
        cargo: 'Analista TI Jr',
        departamento: 'TI',
        data_admissao: new Date('2024-01-15'),
        ativo: true
      },
      {
        nome: 'Roberto Santos',
        email: 'roberto@redealecrim.com.br',
        senha: '123456',
        cargo: 'Compras',
        departamento: 'Compras',
        data_admissao: new Date('2023-06-10'),
        ativo: true
      },
      {
        nome: 'Fernanda Costa',
        email: 'fernanda@redealecrim.com.br',
        senha: '123456',
        cargo: 'Diretora',
        departamento: 'Diretoria',
        data_admissao: new Date('2020-03-01'),
        ativo: true
      },
      {
        nome: 'Kelly Oliveira',
        email: 'kelly@redealecrim.com.br',
        senha: '123456',
        cargo: 'Marketing',
        departamento: 'Marketing',
        data_admissao: new Date('2023-11-20'),
        ativo: true
      },
      {
        nome: 'Fabiana Rossi',
        email: 'fabiana@redealecrim.com.br',
        senha: '123456',
        cargo: 'Coordenadora de RH',
        departamento: 'Recursos Humanos',
        data_admissao: new Date('2022-08-15'),
        ativo: true
      }
    ];

    for (const colabData of colaboradores) {
      const existing = await Colaborador.findOne({ where: { email: colabData.email } });
      if (!existing) {
        await Colaborador.create(colabData);
        console.log(`➕ Colaborador criado: ${colabData.nome}`);
      }
    }

    // Verificar plataformas essenciais
    const plataformas = [
      {
        nome: 'VIBE',
        url: 'https://cpalecrim.vibe.gp/',
        categoria: 'Comunicação',
        descricao: '💬 Plataforma de comunicação interna. Primeiro Acesso: Clicar em \'esqueceu a senha\'',
        status: true
      },
      {
        nome: 'UniBe - Cursos e Treinamentos',
        url: 'https://unibe.grupoboticario.com.br/login',
        categoria: 'Treinamento',
        descricao: '📚 Plataforma de cursos e treinamentos do Grupo Boticário',
        status: true
      },
      {
        nome: 'Extranet Grupo Boticário',
        url: 'https://extranet.grupoboticario.com.br/home',
        categoria: 'Recursos Humanos',
        descricao: '📚 Portal corporativo do Grupo Boticário',
        status: true
      },
      {
        nome: 'Easymob - Registro de Horários',
        url: '#',
        categoria: 'Recursos Humanos',
        descricao: '⏰ App para registrar horários. CHAVE DE ACESSO: cpalecrim',
        status: true
      },
      {
        nome: 'Feedflex - Benefícios',
        url: '#',
        categoria: 'Benefícios',
        descricao: '🍽️ App de benefícios alimentares',
        status: true
      },
      {
        nome: 'Varejo Fácil',
        url: 'https://cp10012.retaguarda.grupoboticario.com.br/app/#/login',
        categoria: 'PDV',
        descricao: 'Sistema PDV da rede - Plataforma para gerenciamento de vendas',
        status: true
      }
    ];

    for (const platData of plataformas) {
      const existing = await Plataforma.findOne({ where: { nome: platData.nome } });
      if (!existing) {
        await Plataforma.create(platData);
        console.log(`➕ Plataforma criada: ${platData.nome}`);
      }
    }

    // Verificar vagas essenciais
    const vagas = [
      {
        titulo: 'Vendedora Loja O Boticário',
        local: 'Taboão da Serra, SP',
        salario: 'R$ 2.000 – R$ 3.500 por mês',
        responsavel: 'Fabiana Rossi',
        empresa: 'Rede Alecrim',
        categoria: 'vendas',
        descricao: 'Auxiliar de Vendas para loja O Boticário. Atendimento ao cliente, demonstração de produtos.',
        beneficios: ['Assistência médica', 'Assistência odontológica', 'Vale-alimentação', 'Convênios'],
        responsabilidades: ['Atender clientes', 'Demonstrar produtos', 'Organização da loja', 'Metas de vendas'],
        requisitos: ['Ensino médio completo', 'Experiência com vendas', 'Conhecimento em cosméticos'],
        tipo: 'Efetivo CLT',
        experiencias_preferenciais: ['Vendas', 'Loja', 'Atendimento ao Cliente'],
        status: true
      },
      {
        titulo: 'Vendedora Loja O Boticário - Butantã',
        local: 'Butantã, SP',
        salario: 'R$ 2.000 – R$ 3.500 por mês',
        responsavel: 'Fabiana Rossi',
        empresa: 'Rede Alecrim',
        categoria: 'vendas',
        descricao: 'Auxiliar de Vendas para loja O Boticário no Butantã.',
        beneficios: ['Assistência médica', 'Assistência odontológica', 'Vale-alimentação'],
        responsabilidades: ['Atendimento personalizado', 'Demonstração de produtos', 'Organização'],
        requisitos: ['Ensino médio completo', 'Paixão por vendas e beleza'],
        tipo: 'Efetivo CLT',
        experiencias_preferenciais: ['Vendas'],
        perguntas_selecao: ['Gosta de trabalhar com produtos de perfumaria?', 'Reside próximo ao Butantã?'],
        status: true
      }
    ];

    for (const vagaData of vagas) {
      const existing = await Vaga.findOne({ where: { titulo: vagaData.titulo, local: vagaData.local } });
      if (!existing) {
        await Vaga.create(vagaData);
        console.log(`➕ Vaga criada: ${vagaData.titulo}`);
      }
    }

    console.log('✅ Dados essenciais verificados e garantidos');
  } catch (error) {
    console.error('❌ Erro ao garantir dados essenciais:', error);
  }
}

// Função para inicializar o banco com dados
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados');

    await sequelize.sync();
    console.log('✅ Tabelas sincronizadas');

    // Sempre garantir dados essenciais
    await ensureEssentialData();
    
    console.log('🎉 Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
  }
}

// Inicializar banco na inicialização da aplicação
initializeDatabase();

// Rotas RESTful para Vagas
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
      attributes: { exclude: ['senha'] }
    });
    res.json(colaboradores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/colaboradores/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
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

    if (!nome || nome.trim().length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    if (!senha || senha.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    const colaboradorExistente = await Colaborador.findOne({ where: { email: email.toLowerCase().trim() } });
    if (colaboradorExistente) {
      return res.status(400).json({ error: 'E-mail já está sendo usado por outro colaborador' });
    }

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

// Rotas Admin para Vagas
app.post('/admin/vagas', async (req, res) => {
  try {
    const vaga = await Vaga.create(req.body);
    res.status(201).json(vaga);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
