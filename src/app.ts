import express from 'express';

import { logger } from './middlewares/log';
import { usersRoutes } from './routes/users';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/limiter';

const app = express();

app.use(logger);
app.use(rateLimiter);

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/', (_, res) => {
  res.send('Hello Express!');
});

app.use(errorHandler);

export default app;
