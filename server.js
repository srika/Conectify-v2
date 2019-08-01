const express = require("express");
// const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const path = require('path');

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

// app.get("/", (req, res) => res.send("API Running"));

// Use Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
