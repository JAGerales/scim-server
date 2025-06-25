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
        // after successful creation, return the status of graph API POST request
    }
    /*
    Suggested POST to Azure:
    // POST to Azure AD via Microsoft Graph API
        try {
            const response = await axios.post(
                'https://graph.microsoft.com/v1.0/users',
                graphUser,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.AZURE_GRAPH_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            // Optionally, add user to your local user store after successful creation
            await addUser(scimUser);
            return response.data; // or return a custom status object
        } catch (error: any) {
            console.error("Error creating user in Azure AD:", error.response?.data || error.message);
            throw new Error(error.response?.data?.error?.message || "Failed to create user in Azure AD");
        }
    }
    */
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