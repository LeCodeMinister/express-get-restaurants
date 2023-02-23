const express = require("express");
const app = express();
const {sequelize} = require("./db");
const restaurantRouter = require("./routes/restaurant");
const port = 3000;

//Your code here

app.use("/restaurants", restaurantRouter);

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})
