import dotenv from 'dotenv';
import express from 'express';
import routes from "./Routes/index"

// Load the environment variables from the .env file
dotenv.config();

// Create an instance of express
const app = express();
const port = process.env.PORT;

//view directory
app.use(express.static(__dirname + '/Views'));

// Parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define the routes
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});