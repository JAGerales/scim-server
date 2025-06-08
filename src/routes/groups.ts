import { Router } from 'express';
import type { Application } from 'express';
import GroupsController from '../controllers/groupsController';

const router = Router();
const groupsController = new GroupsController();

export function setGroupRoutes(app: Application) {
    app.use('/groups', router);
    router.post('/', groupsController.createGroup.bind(groupsController));
    router.get('/:id', groupsController.getGroup.bind(groupsController));
    router.put('/:id', groupsController.updateGroup.bind(groupsController));
    router.delete('/:id', groupsController.deleteGroup.bind(groupsController));
}