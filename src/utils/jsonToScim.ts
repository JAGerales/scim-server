import { User, Group, CustomUserExtension } from "../types/index";

function jsonToScimUser(rawUser: any): User & CustomUserExtension {
console.log("Converting raw user to SCIM format...");

return {
  schemas: [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
  ],
  meta: {
    resourceType: "User",
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    location: `https://api.example.com/scim/v2/Users/${rawUser.employeeNumber}`
  },
  id: rawUser.id,
  userName: rawUser.workEmail, 
  name: {
    givenName: rawUser.firstName,
    familyName: rawUser.lastName
  },
  displayName: rawUser.displayName ?? `${rawUser.firstName} ${rawUser.lastName}`,
  emails: [
    {
      value: rawUser.workEmail, 
      type: "work",
      primary: true
    }
  ],
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    employeeId: rawUser.employeeNumber,
    department: rawUser.department,
    office: rawUser.location,
    title: rawUser.jobTitle,
    phoneNumber: rawUser.mobilePhone,
    supervisor: rawUser.supervisor
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