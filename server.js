const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const navbarRoutes = require("./routes/navbarRoutes");
const footerRoutes = require("./routes/footerRoutes");
const collaboratePageRoutes = require("./routes/collaboratePageRoutes");
const submissionRoutes = require("./routes/collaborationSubmissionRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const jobListingRoutes = require("./routes/jobListingRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Enhanced CORS configuration for multiple origins
const allowedOrigins = [
  "http://localhost:9002", // Your original allowed origin
  "http://localhost:5173", // Your Vite frontend origin
  "https://blentop-backend.vercel.app", // Vercel deployment URL
  "https://blentops-frontend.vercel.app", // Potential frontend Vercel URL
  "https://blentops.vercel.app", // blantops admin panel
  // Add any other origins you need
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blentops API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/collaboratePage", collaboratePageRoutes);
app.use("/api/collaborationSubmission", submissionRoutes);
app.use("/api/contact", inquiryRoutes);
app.use("/api/job-listings", jobListingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/products", productRoutes);
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
