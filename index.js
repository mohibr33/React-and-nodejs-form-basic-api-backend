const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require('cors')
app.use(cors())

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cbf"
});

app.post("/add", function (req, res) {

    console.log(req.body)
    if (!req.body.name || !req.body.age || !req.body.degree) {
        return res.status(400).send("Name, age, and degree are required");
    }
    const q1 = `INSERT INTO info (name, age, degree) VALUES ('${req.body.name}', '${req.body.age}', '${req.body.degree}')`;
    connection.query(q1, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Error inside server");
        } else {
            res.send("User added successfully");
            console.log("User Added");
        }
    });
});

app.get("/user", function (req, res) {
    const q2 = "SELECT * FROM info";
    connection.query(q2, (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        } else {
            return res.json(result);
        }
    });
});

app.get("/user/:id", function (req, res) {
    const q3 = `SELECT * FROM info WHERE id = ${req.params.id}`;
    connection.query(q3, (err, result) => {
        if (err) {
            return res.send("Error inside server");
        } else if (result.length === 0) {
            return res.send("User not found");
        } else {
            return res.send(result);
        }
    });
});

app.put("/user/:id", function (req, res) {
    const { name, age, degree } = req.body;
    const q4 = `UPDATE info SET name = '${name}', degree ='${degree}', age = '${age}' WHERE id = ${req.params.id}`;

    connection.query(q4, (err, result) => {
        if (err) {
            return res.send("Error inside server");
        } else if (result.affectedRows === 0) {
            return res.send("User not found");
        } else {
            return res.send("User updated successfully");
        }
    });
});

app.delete("/user/:id", function (req, res) {
    const id = req.params.id;
    const q5 = `DELETE FROM info WHERE id = ${id}`;

    connection.query(q5, (err, result) => {
        if (err) {
            return res.send("Error inside server");
        } else if (result.affectedRows === 0) {
            return res.send("User not found or no changes made");
        } else {
            return res.send("User deleted successfully");
        }
    });
});

app.listen(9090, function () {
    console.log("Server is running on port 9090");
});
