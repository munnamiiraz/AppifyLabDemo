import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from '../src/config/prisma';
import { errorHandler } from '../src/middleware/errorHandler';
import { notFound } from '../src/middleware/notFound';
import userRoutes from '../src/routes/user.routes';
import authRoutes from '../src/routes/auth.routes';
import uploadRoutes from '../src/routes/upload.route';
import postRoutes from '../src/routes/post.route';
import replyRoutes from '../src/routes/reply.routes';

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
