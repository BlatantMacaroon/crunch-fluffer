import express from 'express';
import cors from 'cors';
import crunchRoutes from './routes/crunchRoutes.ts';
import fluffRoutes from './routes/fluffRoutes.ts';
import { errorHandler } from './middleware/errorMiddleware.ts';

const app = express();
app.use(cors());
app.use(express.json());

//log incoming request using middleware
app.use((req, _res, next) => {
    console.log(`Incoming request: [${req.method}] ${req.url}`);
    next();
})

app.use('/api/crunch', crunchRoutes)
app.use('/api/fluff', fluffRoutes)

app.use(errorHandler);

export default app;