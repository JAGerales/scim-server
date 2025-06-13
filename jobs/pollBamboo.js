/*
const axios = require('axios');
require('dotenv').config();

const subdomain = process.env.BAMBOOHR_SUBDOMAIN;
const apiKey = process.env.BAMBOOHR_API_KEY;

let lastEmployeeIds = new Set();

async function fetchEmployees() {
  try {
    const response = await axios.get(`https://${subdomain}.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/directory`, {
      auth: {
        username: apiKey,
        password: ''
      },
      headers: {
        Accept: 'application/json'
      }
    });

    const employees = response.data.employees;
    console.log(`Fetched ${employees.length} employees`);

    // Detect new hires
    const currentIds = new Set(employees.map(e => e.id));
    const newHires = [...currentIds].filter(id => !lastEmployeeIds.has(id));

    if (newHires.length > 0) {
      console.log('New hires detected:', newHires);
      newHires.forEach(id => {
        const emp = employees.find(e => e.id === id);
        console.log('New Employee:', emp);
        // Optional: Send to SCIM endpoint here
      });
    }

    lastEmployeeIds = currentIds;
  } catch (error) {
    console.error('Error fetching employees:', error.message);
  }
}

setInterval(fetchEmployees, 60 * 1000); // Poll every 60 seconds
fetchEmployees(); // Initial call

*/