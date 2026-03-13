import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    // Si conectas a una DB externa, deja el SSL activo. Si es local, puedes comentarlo.
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a Postgres establecida con éxito.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};

export default sequelize;