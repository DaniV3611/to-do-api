import app from "./src/app";
import dotenv from "dotenv";

// Configure the virtual environment
dotenv.config();

// Read the port from the environment variables
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
