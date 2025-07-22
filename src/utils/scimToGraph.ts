import { randomInt } from 'crypto';

export function scimToGraphUser(scimUser: any) {
    console.log("Converting SCIM to Graph format...");

    // Extract enterprise extension if present
    const enterprise = scimUser["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"] || {};
    const password = passwordGenerator(13); // Generate a strong password
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
            password: password 
        }
    };
}

function passwordGenerator(length = 13) {
    // force password minimum length
    if (length < 13) { 
        length = 13;
    }

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    // Ensure at least one from each set
    let password = [
        uppercase[randomInt(uppercase.length)],
        lowercase[randomInt(lowercase.length)],
        numbers[randomInt(numbers.length)],
        specialChars[randomInt(specialChars.length)]
    ];

    // fill rest of password with random characters from any set
    const all = uppercase + lowercase + numbers + specialChars;
    for (let i = password.length; i < length; i++) {
        password.push(all[randomInt(all.length)]);
    }

    // Shuffle to avoid predictable positions
    for (let i = password.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}
/*
CONSIDERATIONS:
Conditionals for updating user / creating user
    - Creating user should have passwordProfile
    - Updating user should not have passwordProfile
*/
