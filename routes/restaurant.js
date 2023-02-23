const express = require("express");
const {Restaurant} = require("../models/index");
const {sequelize} = require("../db");
const { check, validationResult} = require("express-validator")


const restaurantRouter = express.Router();
restaurantRouter.use(express.json());

//Your code here

// TODO: Create your GET Request Route Below: 

restaurantRouter.get("", async (req, res) => {
    const myRestaurants = await Restaurant.findAll();
    let jsonContent = JSON.stringify(myRestaurants);
    res.send(jsonContent);
})

restaurantRouter.get("/:id", async (req, res) => {
    const myRestaurant = await Restaurant.findByPk(req.params.id);
    let myJsonContent = JSON.stringify(myRestaurant);
    res.send(myJsonContent);
})

restaurantRouter.post("/", async (req, res) => {
    try {
        await Restaurant.create(req.body);
        let myRestaurants = await Restaurant.findAll();
        res.status(201).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

restaurantRouter.put("/:id", async (req, res) => {
    try {
        let chosenRestaurant = await Restaurant.findByPk(req.params.id);
        await chosenRestaurant.update(req.body);
        let myRestaurants = await Restaurant.findAll();
        res.status(202).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

restaurantRouter.delete("/:id", async (req, res) => {
    try {
        let chosenRestaurant = await Restaurant.findByPk(req.params.id);
        await chosenRestaurant.destroy();
        let myRestaurants = await Restaurant.findAll();
        res.status(200).send(myRestaurants);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

module.exports = restaurantRouter;