const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

// Import compiled JavaScript from dist
const { connectDB } = require('../backend/dist/config/prisma');
const { errorHandler } = require('../backend/dist/middleware/errorHandler');
const { notFound } = require('../backend/dist/middleware/notFound');
const userRoutes = require('../backend/dist/routes/user.routes').default;
const authRoutes = require('../backend/dist/routes/auth.routes').default;
const uploadRoutes = require('../backend/dist/routes/upload.route').default;
const postRoutes = require('../backend/dist/routes/post.route').default;
const replyRoutes = require('../backend/dist/routes/reply.routes').default;

const app = express();

app.use(cors({
  origin: process.env.HOST_URL || "*"
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/replies', replyRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
