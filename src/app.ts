import express from 'express';
import bodyParser from 'body-parser';
import { setUserRoutes } from './routes/users';
import { setGroupRoutes } from './routes/groups';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Prefix routes to match BambooHR expectations
app.use('/scim/v2', (req, res, next) => next());
setUserRoutes(app);
setGroupRoutes(app);

app.listen(PORT, () => {
    console.log(`SCIM server is running on port ${PORT}`);
});