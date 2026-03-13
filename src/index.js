import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import sequelize, { testConnection } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// --- Middlewares ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Rutas ---
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    status: "success", // Corregido el typo
    msg: "server ok"
  });
});

// --- Inicio del Servidor ---
const startServer = async () => {
  try {
    // Validar conexión y sincronizar
    await testConnection();
    await sequelize.sync({ force: false });
    console.log("✅ Base de datos conectada y modelos sincronizados");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1); // Cerramos el proceso si la DB falla
  }
};

startServer();