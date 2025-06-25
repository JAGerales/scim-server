const axios = require('axios');
import { initDB, getAllUsers, addUser } from "../src/services/userStore";
require('dotenv').config();

initDB(); // Initialize the database
const subdomain = process.env.BAMBOOHR_SUBDOMAIN;
const apiKey = process.env.BAMBOOHR_API_KEY;

let lastEmployeeIds = new Set<string>();

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
        console.log('Adding new employee:', employeeDetails);
        await addUser(employeeDetails);
        // Send employeeDetails to SCIM endpoint here
        // await axios.post('https://your-scim-endpoint.com/scim/v2/Users', employeeDetails, {
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
  }
}

setInterval(fetchEmployees, 60 * 1000); // Poll every 60 seconds
fetchEmployees(); // Initial call

/* BAMBOO EMPLOYEE OBJECT EXAMPLE
 {
            "id": "1300",
            "displayName": "Jacob Gerales",
            "firstName": "Jacob",
            "lastName": "Gerales",
            "preferredName": null,
            "jobTitle": "IT Intern",
            "mobilePhone": "5105890502",
            "workEmail": "jacob.gerales@brightmachines.com",
            "department": "404 IT",
            "location": "US - San Francisco",
            "division": "Bright Machines HQ",
            "linkedIn": "https://www.linkedin.com/in/jacob-gerales/",
            "pronouns": null,
            "supervisor": "Josh Huynh",
            "photoUploaded": true,
            "photoUrl": "https://images7.bamboohr.com/402355/photos/1300-2-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS80MDIzNTUvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc1MDcwMjc2Mn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzUzMjk0NzcyfX19XX0_&Signature=N1RwybmQFmALcJoJm~wAI7ertCiOVhUdaKEpyeB9TQ6-VigBP5znDWopWeTYRyvqa8SN-~6~C5uN5EEFFZSnrZr4qVdhlDpVJRMDOmc17K0MoAiwmTbE5j-e~5bZP9UbFQq65llRAjzRMpMPwv3KThnfGGM-vJqpscA3Nems7uu-W1FAwpWnnzPaWVNRa3Mjq8sI10ddp1feKdSezg8HO8kHzPjmTFDnQg2XXxO8hS0dPEwc5GnufQTyWYKC3HOy2MaFDg0Ix7vSfaawrmZNqloMmqnS4hHZwaO-YgqVNTKdtWJCQj70UkoDtlxtEWRVDkB9GJ2ZhgBQvmAKj1pbfg__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
            "canUploadPhoto": 1
        },
*/