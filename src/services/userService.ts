import { jsonToScim } from '../utils/jsonToScim';

export class UserService {
    private users: any[] = [];

    createUser(userData: any) {
        const newUser = jsonToScim(userData, 'user'); // pass 'user' or 'group' based on context
        this.users.push(newUser);
        return newUser;
        // DO NOT RETURN NEWUSER, SEND POST TO AZURE AD TO CREATE USER IN TENANT
        // USE AXIOS TO MAKE HTTP REQUEST
    }

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

    private jsonToScim(userData: any) {
        // Convert JSON payload to SCIM format
        return {
            id: userData.id,
            userName: userData.username,
            name: {
                givenName: userData.firstName,
                familyName: userData.lastName
            },
            emails: [{ value: userData.email }]
        };
    }
}