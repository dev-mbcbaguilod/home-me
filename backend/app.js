import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDatabase} from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down due to uncaught exceptions.');
    process.exit(1);
})

dotenv.config({path: "backend/config/config.env"});

// Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());

// Import all routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);

// Using error middlware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to unhandled Promise rejections.');
    server.close(() => {
        process.exit(1);
    });
});

