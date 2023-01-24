const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");

const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const busRoutes = require("./routes/busRoute-routes");

app.use("/api/v1", busRoutes);

const server = http.createServer(app);

ATLAS_URI =
  "mongodb+srv://varshiniak:varshiniak@cluster0.kwevzvl.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5001;
mongoose.set("strictQuery", false);
mongoose
  .connect(ATLAS_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message, "error"));
