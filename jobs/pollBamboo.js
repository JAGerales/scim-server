const axios = require('axios');
const { getAllUsers, addUser } = require('../src/services/userStore');
require('dotenv').config();

const subdomain = process.env.BAMBOOHR_SUBDOMAIN;
const apiKey = process.env.BAMBOOHR_API_KEY;

let lastEmployeeIds = new Set();

// propsed api endpoint: https://api.bamboohr.com/api/gateway.php/brightmachines/v1/employees/1300?fields=firstName,lastName,displayName,workEmail,jobTitle,department,location,mobilePhone,employeeNumber,supervisor
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

    const employees = response.body.employees;
    //validate response
    console.log(`Fetched ${employees.length} employees`);

    const usersInStore = await getAllUsers();
    const userStoreIds = new Set(usersInStore.map(user => user.id));

    const currentIds = new Set(employees.map(e => e.id));
    // Filters out employees that are already in the user store
    const newHires = [...currentIds].filter(id => !lastEmployeeIds.has(id) && !userStoreIds.has(id)); 

    if (newHires.length > 0) {
      console.log('New hires detected:', newHires);
      newHires.forEach(async id => {
        const emp = employees.find(e => e.id === id);
        console.log('New Employee:', emp);
        await addUser(emp);
        //Send to SCIM endpoint here
        //https://localhost:5000/scim/v2/Users
      });
    }
  } catch (error) {
    console.error('Error fetching employees:', error.message);
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