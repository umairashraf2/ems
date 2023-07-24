import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import path from "path";

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json());
// app.use(express.static("public"));

const con = mysql.createConnection({
	host: "sql6.freesqldatabase.com",
	user: "sql6634866",
	password: "5Z6UAIlwyh",
	database: "sql6634866",
	port: 3306,
});


con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    }
    else {
        console.log("Connected");
    }
})


app.listen(8081, () => {
    console.log("Server started");
})
