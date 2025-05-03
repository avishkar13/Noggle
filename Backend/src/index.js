const express = require('express');
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.route.js');
const connectDB = require('./lib/db.js');
PORT = process.env.PORT || 5001;

dotenv.config()
const app = express();

app.use(express.json())
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
}); 
