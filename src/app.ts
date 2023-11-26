import express, { Request, Response } from 'express';

import usersRoutes from './routes/users';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
