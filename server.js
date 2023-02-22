const express = require("express");
const app = express();
const {Restaurant} = require("./models/index");
const {sequelize} = require("./db");
const port = 3000;

//TODO: Create your GET Request Route Below: 
// app.get("/restaurants", async (req, res) => {
//     const myRestaurants = await Restaurant.findAll();
//     let jsonContent = JSON.stringify(myRestaurants);
//     res.send(jsonContent);
// })

// app.get("/restaurants/:id", async (request, response) => {
//     const myRestaurant = await Restaurant.findByPk(request.params.id);
//     let myJsonContent = JSON.stringify(myRestaurant);
//     response.send(myJsonContent);
// })

app.use(express.json())

//Your code here
app.post("/restaurants/", async (req, res) => {
    try {
        await Restaurant.create(req.body);
        let myRestaurants = await Restaurant.findAll();
        await res.status(201).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

app.put("/restaurants/:id", async (req, res) => {
    try {
        let chosenRestaurant = await Restaurant.findByPk(req.params.id);
        await chosenRestaurant.update(req.body);
        let myRestaurants = await Restaurant.findAll();
        await res.status(202).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

app.delete("/restaurants/:id", async (req, res) => {
    try {
        let chosenRestaurant = await Restaurant.findByPk(req.params.id);
        await chosenRestaurant.destroy();
        let myRestaurants = await Restaurant.findAll();
        await res.status(200).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})
