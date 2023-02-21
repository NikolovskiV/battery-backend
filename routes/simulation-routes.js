const express = require("express");

const simulationsController = require("../controllers/simulations-controller");

const router = express.Router();


router.post("/new", simulationsController.createSimulation);


module.exports = router;
