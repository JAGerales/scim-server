import { UserService } from "../services/userService";
import { GroupService } from "../services/groupService";
import express, { Request, Response } from 'express';
import { bambooUserSchema } from "../utils/userValidators";

class UsersController {
    async createUser(req: Request, res: Response) {
        console.log("Inside userController CreateUser");
        console.log(req.body);

        const userService = new UserService();
        const results = [];
        const users = Array.isArray(req.body) ? req.body : [req.body]; // Ensure req.body is an array

        for (const user of users) {
            const userData = bambooUserSchema.safeParse(req.body); // VALIDATE USERDATA BEFORE OPERATIONS
            if (!userData.success) {
                results.push({ user, error: userData.error.errors });
                continue; // Skip this user if validation fails
            }
            try {
                const newUser = await userService.createUser([userData.data]);
                results.push({user: newUser, status: "created"});
            }
            catch (error: any) {
                console.error("Error creating user:", error);
                results.push({ user, error: error.message });
            }
        }
        res.status(207).json(results); // 207 Multi-Status for multiple user operations
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