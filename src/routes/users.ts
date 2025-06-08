import { Router } from 'express';
import type { Application } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

// Define user routes
export function setUserRoutes(app: Application) {
    app.post('/users', usersController.createUser.bind(usersController));
    app.get('/users/:id', usersController.getUser.bind(usersController));
    app.put('/users/:id', usersController.updateUser.bind(usersController));
    app.delete('/users/:id', usersController.deleteUser.bind(usersController));
}