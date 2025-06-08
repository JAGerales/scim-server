import { jsonToScim } from "../utils/jsonToScim";
import { UserService } from "../services/userService";
import { GroupService } from "../services/groupService";
import express, { Request, Response } from 'express';

class UsersController {
    async createUser(req: Request, res: Response) {
        // Logic to create a user
        const userData = req.body;
        const userService = new UserService();
        try {
            const user = userService.createUser(userData);
            res.status(201).json(jsonToScim(user, 'user')); // Respond back to BambooHR
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getUser(req: Request, res: Response) {
        // Logic to get a user by ID
    }

    updateUser(req: Request, res: Response) {
        // Logic to update a user by ID
    }

    deleteUser(req: Request, res: Response) {
        // Logic to delete a user by ID
    }
   
}

export default UsersController;