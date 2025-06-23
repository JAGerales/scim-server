import { jsonToScimUser, jsonToScimGroup } from '../utils/jsonToScim';
import { addUser } from './userStore';

export class UserService {
    async createUser(userData: any[]) {
        console.log("Inside UserService createUser");
        const newUser = jsonToScimUser(userData); // pass 'user' or 'group' based on context
        console.log("New User after conversion to SCIM format:", newUser);
        return newUser;
        // DO NOT RETURN NEWUSER, CONVERT SCIM -> GRAPH MAPPING TO AZURE AD TO CREATE USER IN TENANT
        // USE AXIOS TO MAKE HTTP REQUEST
        // after successful creation, return the status of graph API POST request
    }
/*
    getUser(userId: string) {
        return this.users.find(user => user.id === userId);
    }

    updateUser(userId: string, updatedData: any) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex > -1) {
            const updatedUser = { ...this.users[userIndex], ...this.jsonToScim(updatedData) };
            this.users[userIndex] = updatedUser;
            return updatedUser;
        }
        return null;
    }

    deleteUser(userId: string) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex > -1) {
            return this.users.splice(userIndex, 1)[0];
        }
        return null;
    }
        */
}