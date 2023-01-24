const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const busRoutes = require("./routes/busRoute-routes");

app.use("/api/routes", busRoutes);

ATLAS_URI =
  "mongodb+srv://varshiniak:varshiniak@cluster0.kwevzvl.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5001;
mongoose.set("strictQuery", false);
mongoose
  .connect(ATLAS_URI)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((err) => console.log(err.message, "error"));
