const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
        });

        ("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
mongoose.connection.on("connected", () => {
    ("✅ MongoDB connection established!");
});
mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected! Retrying connection...");
    setTimeout(connectDB, 5000);
});
module.exports = connectDB;
