const express = require("express");
const router = express.Router();
const helper = require("../helpers/car");
const { check } = require("express-validator");
const multer = require("multer");

const upload = multer({ dest: "tmp/csv/" });

router
  .route("/api/car")
  .get(helper.getCars)
  .post(
    [
      check("manufacturer", "Enter manufacturer info").exists(),
      check("model", "Enter model info").exists(),
      check("year", "Enter year info").exists(),
      check("prodcnt", "Enter Producing Country info").exists(),
    ],
    helper.addCars
  );

router
  .route("/api/car/:id")
  .get(helper.getCar)
  .post(
    [
      check("manufacturer", "Enter manufacturer info").exists(),
      check("model", "Enter model info").exists(),
      check("year", "Enter year info").exists(),
      check("prodcnt", "Enter Producing Country info").exists(),
    ],
    helper.editCars
  )
  .delete(helper.deleteCars);

router
  .route("/api/carsearch")
  .post(
    [check("searchData", "Enter manufacturer name").exists()],
    helper.searchCars
  );

router.route("/api/sendCSV").post(upload.single("file"), helper.insertCSV);

module.exports = router;
