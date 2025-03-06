const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const router = require("./Routes/auth-routes.js");
const connectDB = require("./mongodb/connection.js");
const adminRoute = require("./Routes/admin-routes.js");

const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);
app.use("/api/admin", adminRoute);

// ✅ Fix: Correct Path to `dist` Folder
const clientDistPath = path.join(__dirname, "../client/dist");  
app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server is running on http://localhost:${port}`);
    });
});
