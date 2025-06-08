export function jsonToScim(userOrGroup: any, type: 'user' | 'group') {
    if (type === 'user') {
        return {
            schemas: [
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
            ],
            id: userOrGroup.id,
            userName: userOrGroup.username,
            name: {
                givenName: userOrGroup.firstName,
                familyName: userOrGroup.lastName
            },
            emails: [
                {
                    value: userOrGroup.email,
                    primary: true
                }
            ],
            active: userOrGroup.active
        };
    } else if (type === 'group') {
        return {
            schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
            id: userOrGroup.id,
            displayName: userOrGroup.name,
            members: userOrGroup.members.map((member: any) => ({
                value: member.id,
                display: member.displayName
            }))
        };
    }
    throw new Error('Invalid type provided. Must be "user" or "group".');
}