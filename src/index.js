import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import sequelize, { testConnection } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Sincronizar modelos y conectar DB
const startServer = async () => {
  await testConnection();
  // sync({ force: false }) crea las tablas si no existen
  await sequelize.sync({ force: false });
  console.log("✅ Modelos sincronizados");
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

app.use('/api/users', userRoutes);
app.get('/',(req,res)=>{
    res.json({
        status:"succes",
        msg:"server ok "
    })
})

startServer();