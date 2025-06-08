export interface User {
    id: string;
    userName: string;
    name: {
        givenName: string;
        familyName: string;
    };
    emails: Array<{
        value: string;
        primary?: boolean;
    }>;
    active: boolean;
}

export interface Group {
    id: string;
    displayName: string;
    members: Array<{
        value: string;
        display?: string;
    }>;
}