export function scimToGraphUser(scimUser: any) {
    // Extract enterprise extension if present
    const enterprise = scimUser["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] || {};
    // Validate scimUser fields
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
