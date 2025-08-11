import { Sequelize, DataTypes } from 'sequelize';

// Conexão com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
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

async function criarColaboradores() {
  await sequelize.sync();
  
  const colaboradores = [
    {
      nome: 'Fabiana Rossi',
      email: 'fabiana.rossi@redealecrim.com',
      senha: '123456',
      cargo: 'Gerente de RH',
      departamento: 'Recursos Humanos',
      data_admissao: new Date('2023-01-15'),
      ativo: true
    },
    {
      nome: 'Carlos Silva',
      email: 'carlos.silva@redealecrim.com',
      senha: '123456',
      cargo: 'Supervisor de Vendas',
      departamento: 'Vendas',
      data_admissao: new Date('2023-03-20'),
      ativo: true
    },
    {
      nome: 'Ana Costa',
      email: 'ana.costa@redealecrim.com',
      senha: '123456',
      cargo: 'Coordenadora de Marketing',
      departamento: 'Marketing',
      data_admissao: new Date('2023-05-10'),
      ativo: true
    }
  ];

  for (const colaborador of colaboradores) {
    await Colaborador.upsert(colaborador);
  }
  
  console.log(`Colaboradores criados! ${colaboradores.length} registros inseridos.`);
  process.exit();
}

criarColaboradores();
