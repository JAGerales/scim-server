import { jsonToScimUser, jsonToScimGroup } from '../utils/jsonToScim';
import { sendToAzure } from '../utils/graphApi';
import { scimToGraphUser } from '../utils/scimToGraph';

export class UserService {
    async createUser(userData: any[]) {
        // NEEDS INPUT VALIDATION AND ERROR HANDLING [TODO]
        console.log("Inside UserService createUser");
        const scimUser = jsonToScimUser(userData); // pass 'user' or 'group' based on context
        console.log("New User after conversion to SCIM format:", scimUser);
        const graphUser = scimToGraphUser(scimUser); // convert SCIM to Graph format
        console.log("New User after conversion to GraphAPI format:", graphUser);

        return graphUser;
    }
    /*
      1. Transform and create user
        const scimUser = jsonToScimUser(userData); // pass 'user' or 'group' based on context
        const graphUser = scimToGraphUser(scimUser); // convert SCIM to Graph format
        const createdUser = await sendToAzure(graphUser, 'POST'); // POST to Graph API
       2. Assign to groups/DLs after user creation
        await assignGroupsByDepartment(createdUser);
        await assignGroupsByLocation(createdUser);

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