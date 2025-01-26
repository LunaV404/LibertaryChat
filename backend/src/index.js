import express from 'express';
import authRoutes from './routes/auth.route.js'
import messageRoutes from "./routes/message.route.js"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from './lib/db.js';
dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use((req, res, next) => {
    console.log("Requête reçue :", req.method, req.url);
    next();
});

app.use('/api/auth', authRoutes)
app.use('api/message', messageRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});