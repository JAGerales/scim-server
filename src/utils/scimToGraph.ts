/**
 * Converts a SCIM user object to a Microsoft Graph API user object.
 * @param scimUser The SCIM user object (see sample above).
 * @returns The Graph API user object.
 */
export function scimToGraphUser(scimUser: any) {
    // Extract enterprise extension if present
    const enterprise = scimUser["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] || {};

    return {
        // Required Graph fields
        accountEnabled: true, // or set based on your logic
        displayName: scimUser.displayName,
        mailNickname: scimUser.userName?.split('@')[0],
        userPrincipalName: scimUser.userName,
        givenName: scimUser.name?.givenName,
        surname: scimUser.name?.familyName,
        // Enterprise fields
        jobTitle: enterprise.title,
        department: enterprise.department,
        officeLocation: enterprise.office,
        mobilePhone: enterprise.phoneNumber,
        employeeId: enterprise.employeeId,
        mail: scimUser.emails?.[0]?.value,
        passwordProfile: {
            forceChangePasswordNextSignIn: false, // user can change pw upon request
            password: "YourStrongP@ssword123" // Replace with actual password logic (FUNCTION TO GENERATE PW BASED ON AD REQUIREMENTS)
        }
    };
}
/*
CONSIDERATIONS:
Conditionals for updating user / creating user
    - Creating user should have passwordProfile
    - Updating user should not have passwordProfile
Create a function to generate a strong password based on AD requirements
    - 13+ alphanumeric characters
    - At least 1 uppercase, 1 lowercase, 1 number, 1 special
    - No words from dictionary
*/
/*
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
    ],
    "meta": {
        "resourceType": "User",
        "created": "2025-06-23T23:06:02.147Z",
        "lastModified": "2025-06-23T23:06:02.149Z",
        "location": "https://api.example.com/scim/v2/Users/61255"
    },
    "id": "61255",
    "userName": "jacob.gerales@brightmachines.com",
    "name": {
        "givenName": "Jacob",
        "familyName": "Gerales"
    },
    "displayName": "Jacob Gerales",
    "emails": [
        {
            "value": "jacob.gerales@brightmachines.com",
            "type": "work",
            "primary": true
        }
    ],
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
        "employeeId": "61255",
        "department": "404 IT",
        "office": "US - San Francisco",
        "title": "IT Intern",
        "phoneNumber": "5105890502",
        "supervisor": "Huynh, Josh"
    }
}
*/