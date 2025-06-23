import { User, Group, CustomUserExtension } from "../types/index";

function jsonToScimUser(rawUser: any): User & CustomUserExtension {
console.log("Converting raw user to SCIM format:", rawUser);
console.log("Raw user ID:", rawUser[0].supervisor);
return {
  schemas: [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
  ],
  meta: {
    resourceType: "User",
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    location: `https://api.example.com/scim/v2/Users/${rawUser[0].employeeNumber}`
  },
  id: rawUser[0].employeeNumber,
  userName: rawUser[0].workEmail, 
  name: {
    givenName: rawUser[0].firstName,
    familyName: rawUser[0].lastName
  },
  displayName: rawUser[0].displayName ?? `${rawUser[0].firstName} ${rawUser[0].lastName}`,
  emails: [
    {
      value: rawUser[0].workEmail, 
      type: "work",
      primary: true
    }
  ],
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    employeeId: rawUser[0].employeeNumber,
    department: rawUser[0].department,
    office: rawUser[0].location,
    title: rawUser[0].jobTitle,
    phoneNumber: rawUser[0].mobilePhone,
    supervisor: rawUser[0].supervisor
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