const express = require("express");
const router = express.Router();
const {
  getRoutes,
  postRoutes,
  deleteRoutes,
  updateRoutes,
} = require("../controllers/busRoutes-clr");

router.get("/", getRoutes);
router.post("/", postRoutes);
router.delete("/:id", deleteRoutes);
router.put("/routeDetail/:id", updateRoutes);

module.exports = router;
