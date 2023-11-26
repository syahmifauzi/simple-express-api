import express from 'express';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
