const controller = require("../controllers/vendorController")

const router = require("express").Router();

router.get("/restaurants", controller.getRestaurants)

module.exports=router