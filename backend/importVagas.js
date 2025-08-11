import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

// Conexão com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Modelo Vaga (ajustado para todos os campos do JSON)
const Vaga = sequelize.define('Vaga', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  titulo: DataTypes.STRING,
  local: DataTypes.STRING,
  salario: DataTypes.STRING,
  responsavel: DataTypes.STRING,
  empresa: DataTypes.STRING,
  categoria: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  beneficios: DataTypes.JSON,
  responsabilidades: DataTypes.JSON,
  requisitos: DataTypes.JSON,
  tipo: DataTypes.STRING,
  experiencias_preferenciais: DataTypes.JSON,
  perguntas_selecao: DataTypes.JSON,
  status: { type: DataTypes.BOOLEAN, defaultValue: true }
});

async function importVagas() {
  await sequelize.sync({ force: true }); // Força recriação da tabela
  const filePath = path.resolve('../public/vagas.json');
  const vagas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const vaga of vagas) {
    // Remove o campo id para permitir auto-incremento
    delete vaga.id;
    // Adiciona status: true por padrão se não existir
    vaga.status = vaga.status !== undefined ? vaga.status : true;
    await Vaga.create(vaga); // Usa create ao invés de upsert
  }
  console.log(`Importação concluída! ${vagas.length} vagas importadas.`);
  process.exit();
}

importVagas();
