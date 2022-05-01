import express from 'express';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';


import videoRoutes from './routes/videos.routes';

const app = express()

app.set('port', 5000)

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', videoRoutes)

export default app;