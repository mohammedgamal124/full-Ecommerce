const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes")
const bannerRoutes = require("./routes/bannerRoutes")


// Load environment variables
dotenv.config();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Body Parser
app.use(express.json());

// Connect to MongoDB
connectDB();

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Backend server running 🚀" });
});

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

app.use("/api/banners", bannerRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});