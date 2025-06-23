import { jsonToScimUser, jsonToScimGroup } from "../utils/jsonToScim";
import { UserService } from "../services/userService";
import { GroupService } from "../services/groupService";
import express, { Request, Response } from 'express';
import { bambooUserSchema } from "../utils/userValidators";

class UsersController {
    /* Required for POST
{
  "accountEnabled": true,
  "displayName": "Jacob Gerales",
  "mailNickname": "jgerales",
  "userPrincipalName": "jgerales@yourdomain.com",
  "passwordProfile": {
    "forceChangePasswordNextSignIn": true,
    "password": "YourStrongP@ssword123"
  }
}
    */
    async createUser(req: Request, res: Response) {
        // Logic to create a user
        console.log("Inside userController CreateUser");
        console.log(req.body);
        const userData = bambooUserSchema.parse(req.body); // VALIDATE USERDATA BEFORE OPERATIONS
        if (!userData) {
            return res.status(400).json({ error: "Invalid user data" });
        }
        console.log("userData after validation", userData);
        const userService = new UserService();
        try {
            const user = await userService.createUser([userData]);
            res.status(201).json(user); // Respond back to BambooHR
        } catch (error: any) {
            console.log(error);
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