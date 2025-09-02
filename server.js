import connectDB from "./src/db/db.js";
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})