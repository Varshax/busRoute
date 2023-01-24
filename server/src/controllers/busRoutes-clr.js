const BusRoute = require("../models/busRoute-model");

const getRoutes = async (req, res) => {
  try {
    const busRoutes = await BusRoute.find();
    res.status(200).json(busRoutes);
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const postRoutes = async (req, res) => {
  const route = req.body;
  const newRoute = new BusRoute(route);

  try {
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const deleteRoutes = async (req, res) => {
  await BusRoute.findOneAndDelete({ _id: req.params.id }, (err, route) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!route) {
      return res.status(404).json({ success: false, error: `route not found` });
    }

    return res.status(200).json({ success: true, data: route });
  }).catch((err) => console.log(err.message));
};

const updateRoutes = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  BusRoute.findOne({ _id: req.params.id }, (err, route) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Route not found!",
      });
    }
    route.routeName = body.routeName;
    route.routeDirection = body.routeDirection;
    route.routeStatus = body.routeStatus;
    route.routeStops = body.routeStops;
    route
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: route._id,
          message: "Route updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Route not updated!",
        });
      });
  });
};

module.exports = { getRoutes, postRoutes, deleteRoutes, updateRoutes };
