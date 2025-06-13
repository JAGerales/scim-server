export interface User {
    schemas: string[];
    meta?:{
        resourceType: string;
        created: string;
        lastModified: string;
        location: string; // URL to the resource, e.g., `https://api.example.com/scim/v2/Users/${id}`
    }
    id: string;
    userName: string;
    name: {
        givenName: string;
        familyName: string;
    };
    displayName?: string;
    emails: Array<{
        value: string;
        type: string;
        primary: boolean;
    }>;
    active: boolean;

    'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User'?: CustomUserExtension;
}

export interface CustomUserExtension {
    employeeId?: string;
    department?: string;
    office?: string;
    title?: string;
    phoneNumber?: string;
    manager?: {
        id: string;
        display?: string;
    };
}

export interface Group {
    schemas: string[];
    meta:{
        resourceType: string;
        created: string;
        lastModified: string;
        location: string; // URL to the resource, e.g., `https://api.example.com/scim/v2/Users/${id}`
    }
    id: string;
    name?: string;
    endpoint?: string;
    description?: string;
    members?: Array<{
        value: string;
        display?: string;
    }>;

    'urn:brightmachines:params:scim:schemas:extension:custom:2.0:Group'?: CustomGroupExtension;
}

export interface CustomGroupExtension {
    groupType?: string; // Security, Microsoft 365, Assigned, etc.
    owner?: {
        value: string;
        display?: string;
    };
    externalId?: string;
}

