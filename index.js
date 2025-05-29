require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// MySQL connection
const db = require("./db/connect"); // This just connects on import

app.use("/", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(express.json());

// Routers
const authRouter = require("./routes/auth");
const blogsRouter = require("./routes/blogs");

// Error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
