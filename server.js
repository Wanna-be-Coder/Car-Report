const http = require("http");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const carRoutes = require("./routes/car");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const csv = require("fast-csv");
const morgan = require("morgan");

const Router = express.Router;
const upload = multer({ dest: "tmp/csv/" });

const router = new Router();
app.use(Express.static(path.join(__dirname, "./client/build")));

//...
app.use("/upload-csv", router);
app.use(express.json({ extended: false }));
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(morgan("tiny"));

app.use(carRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is Running at ${PORT}`));
