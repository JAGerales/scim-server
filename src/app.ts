import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/users';
import { initDB } from './services/userStore'; 
import dotenv from 'dotenv'; 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//initDB(); // Initialize the database

app.use(bodyParser.json());
app.use(express.json());

app.use('/scim/v2', router);

app.listen(PORT, () => {
    console.log(`SCIM server is running on port ${PORT}`);
});