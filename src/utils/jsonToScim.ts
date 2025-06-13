import { User, Group, CustomUserExtension } from "../types/index";

function jsonToScimUser(rawUser: any): User & CustomUserExtension {
        return { // ENSURE THIS HANDLES DATE PARSING
            schemas: [
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
            ],
            meta:{
                resourceType: "User",
                created: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                location: `https://api.example.com/scim/v2/Users/${rawUser.id}` //UPDATE
            },
            id: rawUser.id,
            userName: rawUser.username,
            name: {
                givenName: rawUser.firstName,
                familyName: rawUser.lastName
            },
            displayName: rawUser.displayName,
            emails: [
                {
                    value: rawUser.email,
                    type: "work",
                    primary: true
                }
            ],
            active: rawUser.active,
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                employeeId: rawUser?.employeeId ?? '',
                department: rawUser.department,
                office: rawUser.office,
                title: rawUser.title,
                phoneNumber: rawUser.phoneNumber,
                manager: rawUser.manager ? {
                    id: rawUser.manager.id,
                    display: rawUser.manager.displayName
                } : undefined
            }
            
        };
}

function jsonToScimGroup(rawGroup: any):  Group {
        return {
            schemas: [
                "urn:ietf:params:scim:schemas:core:2.0:Group",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:Group"
            ],
            meta:{
                resourceType: "Group",
                created: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                location: `https://api.example.com/scim/v2/Groups/${rawGroup.id}` //UPDATE
            },
            id: rawGroup.id,
            name: rawGroup.name,
            endpoint: rawGroup.endpoint,
            description: rawGroup.description,
            members: rawGroup.members?.map((member: any) => ({
                value: member.id,
                display: member.displayName
            }))
        };
}

export { jsonToScimGroup, jsonToScimUser };
/*
export const convertToScimUser = (bambooJson: any): any => {
  return {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    userName: bambooJson.workEmail,
    name: {
      givenName: bambooJson.firstName,
      familyName: bambooJson.lastName,
    },
    active: true,
    emails: [{ value: bambooJson.workEmail, primary: true }],
    externalId: bambooJson.id,
  };
};

*/