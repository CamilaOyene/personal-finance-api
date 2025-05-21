import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.routes.js';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Rutas
app.use('/api',router);


export default app;
