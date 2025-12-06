import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from '../backend/src/config/prisma';
import { errorHandler } from '../backend/src/middleware/errorHandler';
import { notFound } from '../backend/src/middleware/notFound';
import userRoutes from '../backend/src/routes/user.routes';
import authRoutes from '../backend/src/routes/auth.routes';
import uploadRoutes from '../backend/src/routes/upload.route';
import postRoutes from '../backend/src/routes/post.route';
import replyRoutes from '../backend/src/routes/reply.routes';

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: process.env.HOST_URL || "*"
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().catch(console.error);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
