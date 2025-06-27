const axios = require('axios');
import { initDB, getAllUsers, addUser } from "../src/services/userStore";
require('dotenv').config();

initDB(); // Initialize the database
const subdomain = process.env.BAMBOOHR_SUBDOMAIN;
const apiKey = process.env.BAMBOOHR_API_KEY;

let lastEmployeeIds = new Set<string>();
let isPolling = false;

// propsed api endpoint: 
async function fetchEmployeeDetails(id: string) {
  const response = await axios.get(
    `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/${id}?fields=employeeNumber,firstName,lastName,displayName,workEmail,jobTitle,department,location,mobilePhone,supervisor,division,linkedIn,pronouns,photoUploaded,photoUrl,canUploadPhoto`,
    {
      auth: { username: apiKey, password: '' },
      headers: { Accept: 'application/json' }
    }
  );
  return { id, ...response.data };
}

async function fetchEmployees() {
  if (isPolling) return; // Prevent overlapping polls
  isPolling = true;
  try {
    const response = await axios.get(`https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/directory`, {
      auth: {
        username: apiKey,
        password: ''
      },
      headers: {
        Accept: 'application/json'
      }
    });
    const employees = response.data.employees; // grabs employee array from response
    // todo: validate employee data structure
    console.log(`Fetched ${employees.length} employees from bambooHR`);

    const usersInStore = await getAllUsers();
    const userStoreIds = new Set(usersInStore.map(user => user.id));

    const currentIds = new Set<string>(employees.map((e: { id: string; }) => e.id));
    // Filters out employees that are already in the user store
    const newHires = [...currentIds].filter(id => !lastEmployeeIds.has(id) && !userStoreIds.has(id)); 

    if (newHires.length > 0) {
      console.log('New hires detected:', newHires);
      for (const id of newHires){
        const employeeDetails = await fetchEmployeeDetails(id as string);
        console.log('Adding new employee:', employeeDetails.displayName);
        await addUser(employeeDetails); // may need to validate result before POSTing
        // Send employeeDetails to SCIM endpoint here
        const req = await axios.post('http://localhost:3000/scim/v2/Users', employeeDetails, {
        });
        if (req.status === 201 || req.status === 200) {
          console.log(`Employee ${employeeDetails.id} added to SCIM endpoint successfully`);
        }
        else{
          console.error(`Failed to add employee ${employeeDetails.id} to SCIM endpoint:`, req.statusText);
        }
        console.log("Employee added to user store");
      }
    }
    else{
        console.log('No new hires detected');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching employees:', error.message);
      console.log(error);
    } else {
      console.error('Error fetching employees:', error);
    }
  } finally {
    isPolling = false; // Reset polling state
  }
}

setInterval(fetchEmployees, 60 * 1000); // Poll every 60 seconds
fetchEmployees(); // Initial call

/* BAMBOO EMPLOYEE OBJECT EXAMPLE

2) CHECK FOR DUPLICATES BEFORE ADDING THE USER
export async function addUser(user: User) {
  await db.read();
  if (db.data!.users.some(u => u.id === user.id)) return; // Prevent duplicate
  db.data!.users.push(user);
  await db.write();
}
*/