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

async function deletarTodosColaboradores() {
  await sequelize.sync();
  
  const colaboradores = await Colaborador.findAll();
  
  colaboradores.forEach(col => {
    console.log(`- ${col.nome} (${col.email})`);
  });
  
  await Colaborador.destroy({ where: {} });
  
  process.exit();
}

deletarTodosColaboradores();
