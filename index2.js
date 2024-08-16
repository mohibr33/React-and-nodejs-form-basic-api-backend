const express = require("express");
const app = express();
const userModel = require("./model");

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hey");
});

app.post("/create", async (req, res) => {
    let createdUser = await userModel.create({
        name: req.body.name,
        age: req.body.age,
        degree: req.body.degree
    });
    res.send("User created successfully");
});

app.put("/update", async (req, res) => {
    const { name, newName, newAge, newDegree } = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
        { name: name },
        { name: newName, age: newAge, degree: newDegree },
        { new: true }
    );

    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/read", async (req, res) => {
    let users = await userModel.find();
    res.send(users);
});

app.delete("/delete", async (req, res) => {
    const { name } = req.body;
    let deletedUser = await userModel.findOneAndDelete({ name: name });

    if (deletedUser) {
        res.send("User deleted successfully");
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
