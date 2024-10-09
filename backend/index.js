import express from "express";
import cors from "cors";
import connectDB from "./config/server.config.js";
import router from "./routes/transaction.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();

// API Routes
app.use("/api", router);

app.get("/", (req, res) => {
   res.send("Hello from the backend!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   console.log(`http://localhost:${PORT}`);
});
