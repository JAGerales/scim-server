import { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

router.post('/Users', usersController.createUser.bind(usersController)); // taking in a single json employee object
router.get('/Users/:id', usersController.getUser.bind(usersController));    
router.put('/Users/:id', usersController.updateUser.bind(usersController));
router.delete('/Users/:id', usersController.deleteUser.bind(usersController));

export default router;