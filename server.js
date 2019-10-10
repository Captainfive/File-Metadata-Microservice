"use strict";

// Require third party dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// require and use "multer"
const multer = require("multer");
const upload = multer({ dest: "./public" });

// Declare express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
    res.json({ greetings: "Hello, API" });
});

// Post form file to upload
app.route("/api/fileanalyse")
    .post(upload.single("upfile"), (req, res) => {
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        })
    });

app.listen(process.env.PORT || 3000, function() {
    console.log("Node.js listening ...");
});
