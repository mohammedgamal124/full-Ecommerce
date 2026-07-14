const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes")
const bannerRoutes = require("./routes/bannerRoutes")
const cartRoutes = require("./routes/CartRoutes");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
// Load environment variables
dotenv.config();

// Security middleware
app.use(helmet());

// Enable CORSnpm
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

app.use("/api/cart", cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});