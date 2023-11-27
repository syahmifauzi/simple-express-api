import request from 'supertest';

import { User } from '../src/models/user';
import app from '../src/app';

const createUser = async (user: User) => {
  return await request(app).post('/users').send(user);
};

const getUser = async (id: string) => {
  return await request(app).get(`/users/${id}`);
};

const updateUser = async (id: string, user: Partial<User>) => {
  return await request(app).patch(`/users/${id}`).send(user);
};

const deleteUser = async (id: string) => {
  return await request(app).delete(`/users/${id}`);
};

describe('GET /', () => {
  it('should respond with "Hello Express!" and status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Express!');
  });
});

describe('GET /users', () => {
  it('should return an array of users with status 200', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /users/:id', () => {
  describe("given a valid user's id", () => {
    it('should return a user with status 200', async () => {
      const resPost = await createUser({
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      });
      const resGet = await getUser(resPost.body.id);
      expect(resGet.status).toBe(200);
      expect(resGet.body).toBeInstanceOf(Object);
    });
  });

  describe("given an invalid user's id", () => {
    it('should return a 404 status if user is not found', async () => {
      const resGet = await getUser('invalid-id');
      expect(resGet.status).toBe(404);
    });
  });
});

describe('POST /users', () => {
  const user: User = {
    firstName: 'Syahmi',
    lastName: 'Fauzi',
    age: 20,
  };

  describe("given user's data", () => {
    it('should create a new user', async () => {
      const resPost = await createUser(user);
      const resGet = await getUser(resPost.body.id);
      expect(resGet.body).toEqual({ ...user, id: resPost.body.id });
    });

    it('should return a new user with an id', async () => {
      const response = await createUser(user);
      expect(response.body).toHaveProperty('id');
    });

    it('should respond with status 200', async () => {
      const response = await createUser(user);
      expect(response.status).toBe(200);
    });

    it('should specify JSON in the content type header', async () => {
      const response = await createUser(user);
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });
});

describe('PATCH /users', () => {
  let createdUser: User;

  const updatedUser: Partial<User> = {
    firstName: 'Syahmi',
    lastName: 'Fauzi',
  };

  beforeEach(async () => {
    const res = await createUser({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
    createdUser = res.body;
  });

  describe("given a valid user's id and data to update", () => {
    it('should update the user', async () => {
      const response = await updateUser(`${createdUser.id}`, updatedUser);
      expect(response.body).toEqual({ ...createdUser, ...updatedUser });
    });

    it('should respond with status 200', async () => {
      const response = await updateUser(`${createdUser.id}`, updatedUser);
      expect(response.status).toBe(200);
    });
  });

  describe("given an invalid user's id and data to update", () => {
    it('should respond with status 404', async () => {
      const response = await updateUser('invalid-id', updatedUser);
      expect(response.status).toBe(404);
    });

    it('should respond with a message "User not found!"', async () => {
      const response = await updateUser('invalid-id', updatedUser);
      expect(response.text).toBe('User not found!');
    });
  });
});

describe('DELETE /users', () => {
  let createdUser: User;

  beforeEach(async () => {
    const res = await createUser({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
    createdUser = res.body;
  });

  describe("given a valid user's id", () => {
    it('should delete the user', async () => {
      const response = await deleteUser(`${createdUser.id}`);
      expect(response.text).toBe('User deleted successfully!');
    });

    it('should respond with status 200', async () => {
      const response = await deleteUser(`${createdUser.id}`);
      expect(response.status).toBe(200);
    });
  });

  describe("given an invalid user's id", () => {
    it('should respond with status 404', async () => {
      const response = await deleteUser('invalid-id');
      expect(response.status).toBe(404);
    });

    it('should respond with a message "User not found!"', async () => {
      const response = await deleteUser('invalid-id');
      expect(response.text).toBe('User not found!');
    });
  });
});
