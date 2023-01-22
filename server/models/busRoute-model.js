const mongoose = require("mongoose");

const BusStop = new mongoose.Schema({
  stopName: { type: String, required: true },
  stopLatitude: { type: Number, required: true },
  stopLongitude: { type: Number, required: true },
});

const BusRoute = new mongoose.Schema({
  routeName: { type: String, required: true },
  routeDirection: { type: String, required: true },
  routeStatus: { type: String, required: true },
  routeStops: { type: [BusStop] },
});

module.exports = mongoose.model("busRoute", BusRoute);
