const env = require("dotenv");
env.config(); // Load environment variables

const express = require("express");

const app = express(); // Initialize express
const path = require('path')

const userRouter = require("./routes/route");

app.use(express.json())// to enable app to send JSON data/to be used after app creation
app.use(express.static(path.join(__dirname, 'dist')))// for use of static files/folders

const cors = require("cors");
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
const { connectDB } = require('./database/dbConnection')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})
app.use("/api", userRouter); // Use router
const PORT = process.env.PORT || 5000; // Fallback port in case env variable is missing
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`😊 Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect MongoDB:", err);
  }
});


