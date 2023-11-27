import express from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/users';

export const usersRoutes = express.Router();

usersRoutes.post('/', createUser);
usersRoutes.get('/', getUsers);
usersRoutes.get('/:id', getUser);
usersRoutes.patch('/:id', updateUser);
usersRoutes.delete('/:id', deleteUser);
