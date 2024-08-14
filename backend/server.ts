// src/server.ts
import express from 'express';
import { createServer } from 'http';
import { connectDb } from './src/database/posatgres'
import userRoutes from './src/routes/userRoutes';

const app = express();
const httpServer = createServer(app);
app.use(express.json());

app.use('/app', userRoutes);

connectDb();
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
