import { UserService } from "../services/userService";
import { GroupService } from "../services/groupService";
import express, { Request, Response } from 'express';
import { bambooUserSchema } from "../utils/userValidators";

class UsersController {
    async createUser(req: Request, res: Response) {
        console.log("Inside userController CreateUser");
        console.log(req.body);

        // Check if the request body is a single JSON object
        if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
            return res.status(400).json({ error: "Request body must be a single user object" });
        }
        console.log("Before data validation");

        // Validate the user data against the schema
        const userData = bambooUserSchema.safeParse(req.body);
        if (!userData.success) {
            console.log(userData.data);
            return res.status(400).json({ error: "Invalid user data", details: userData.error.errors });
        }
        console.log("After data validation");
        // If validation passes, proceed to create the user
        try {
            const userService = new UserService();
            const newUser = await userService.createUser(userData.data);
            return res.status(201).json({ user: newUser, status: "User created successfully" }); 
        }
        catch (error: any) {
            console.error("Error creating user:", error);
            return res.status(500).json({ error: "Internal server error" });
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