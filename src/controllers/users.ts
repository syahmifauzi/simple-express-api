import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

let users = [
  { firstName: 'John', lastName: 'Doe', age: 30, id: uuidv4() },
  { firstName: 'Jane', lastName: 'Doe', age: 25, id: uuidv4() },
];

export const createUser = (req: Request, res: Response) => {
  const user = { ...req.body, id: uuidv4() };
  users.push(user);
  res.json(user);
};

export const getUsers = (_: Request, res: Response) => {
  res.json(users);
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).send('User not found!');
  res.json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).send('User not found!');
  const updatedUser = { ...user, ...req.body, id: user.id };
  users = users.map((u) => (u.id === id ? updatedUser : u));
  res.json(updatedUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).send('User not found!');
  users = users.filter((u) => u.id !== id);
  res.send(`User deleted successfully!`);
};
