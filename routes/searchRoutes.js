const controller = require("../controllers/searchController")

const router = require("express").Router();

router.post("/getQuery", controller.getQuery)
router.post("/getrestaurants", controller.getRestaurants)

module.exports=router