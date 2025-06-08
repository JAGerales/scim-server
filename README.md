# SCIM Server

This project implements a SCIM (System for Cross-domain Identity Management) server that processes users and groups, converting JSON payloads into SCIM-compliant payloads.

## Features

- User management: Create, retrieve, update, and delete users.
- Group management: Create, retrieve, update, and delete groups.
- Conversion of JSON payloads to SCIM format.

## Project Structure

```
scim-server
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers
│   │   ├── usersController.ts  # Handles user-related operations
│   │   └── groupsController.ts # Handles group-related operations
│   ├── routes
│   │   ├── users.ts            # Defines user routes
│   │   └── groups.ts           # Defines group routes
│   ├── services
│   │   ├── userService.ts      # Processes user data
│   │   └── groupService.ts     # Processes group data
│   ├── utils
│   │   └── jsonToScim.ts       # Converts JSON to SCIM payloads
│   └── types
│       └── index.ts            # Defines User and Group interfaces
├── package.json                 # npm configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation

Project Structure Summary:
src = main code
app.ts = entry point
controllers = handle requests/responses
routes = define endpoints
services = business logic
utils = helpers
types = TypeScript types/interfaces
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd scim-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage Examples

- **Create User**: Send a POST request to `/users` with the user data in JSON format.
- **Get User**: Send a GET request to `/users/{id}` to retrieve user details.
- **Create Group**: Send a POST request to `/groups` with the group data in JSON format.
- **Get Group**: Send a GET request to `/groups/{id}` to retrieve group details.

## License

This project is licensed under the MIT License.