const express = require("express");
const router = express.Router();
const control = require("../controllers/main");

router.get("/", control.get_home);

router.put("/countries/visited", control.put_countries_visited);

router.get("/countries/visited", control.get_countries_visited);

router.post("/location", control.get_location);

module.exports = router;
