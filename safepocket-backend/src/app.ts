import express from 'express';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import { swaggerUi, swaggerSpec } from './config/swagger';

const app = express();
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app;
