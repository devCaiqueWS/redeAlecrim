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

async function deletarColaboradorPorEmail(email) {
  await sequelize.sync();
  
  const colaborador = await Colaborador.findOne({ where: { email } });
  
  if (!colaborador) {
    console.log(`❌ Colaborador com email "${email}" não encontrado.`);
    process.exit();
  }
  
  console.log(`🔍 Encontrado: ${colaborador.nome} (${colaborador.email})`);
  
  await colaborador.destroy();
  
  console.log(`✅ Colaborador "${colaborador.nome}" foi deletado!`);
  process.exit();
}

// Pega o email do argumento da linha de comando
const email = process.argv[2];

if (!email) {
  console.log('❌ Uso: node deletarColaboradorPorEmail.js <email>');
  console.log('📝 Exemplo: node deletarColaboradorPorEmail.js fabiana.rossi@redealecrim.com');
  process.exit();
}

deletarColaboradorPorEmail(email);
