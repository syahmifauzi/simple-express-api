import express from 'express';

import { usersRoutes } from './routes/users';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/', (_, res) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
