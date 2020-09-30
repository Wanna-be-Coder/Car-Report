const Car = require("../models/Car");
const { validationResult } = require("express-validator");
// const csv = require("csv-parser");
const fs = require("fs");
const multer = require("multer");
const csv = require("fast-csv");

const upload = multer({ dest: "tmp/csv/" });

exports.getCars = async (req, res) => {
  const allCars = await Car.find();
  res.json(allCars);
};

exports.editCars = async (req, res) => {
  if (validationResult(req).errors.length != 0) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }
  const { manufacturer, model, year, prodcnt } = req.body;
  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    {
      manufacturer,
      model,
      year,
      prodcnt,
    },
    (doc) => doc
  );
  res.json(updatedCar);
};

exports.getCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
};

exports.deleteCars = async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  res.json(car);
};

exports.addCars = async (req, res) => {
  if (validationResult(req).errors.length != 0) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }
  const { manufacturer, model, year, prodcnt } = req.body;

  const newCar = await Car.create({ manufacturer, model, year, prodcnt });

  res.status(201).json(newCar);
};

exports.searchCars = async (req, res) => {
  if (validationResult(req).errors.length != 0) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const { searchData } = req.body;
  const car = await Car.find({ ["prodcnt"]: searchData });
  res.status(200).json(car);
};

exports.insertCSV = (req, res) => {
  // if (validationResult(req).errors.length != 0) {
  //   return res.status(400).json({ errors: validationResult(req).array() });
  // }
  // console.log(req.busboy);
  // const { csvFile } = req.body;
  // const results = [];

  // fs.createReadStream(req.busboy.path)
  //   .pipe(csv())
  //   .on("data", (data) => results.push(data))
  //   .on("end", () => {
  //     console.log(results);
  //   });
  // res.status(201).json("done");
  const fileRows = [];

  // open uploaded file
  csv
    .parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows);
      fileRows.forEach(async (row, index) => {
        console.log(index);
        if (index === 0) {
          console.log(row);
        } else {
          const manufacturer = row[0];
          const model = row[1];
          const year = row[2];
          const prodcnt = row[3];

          const newCar = await Car.create({
            manufacturer,
            model,
            year,
            prodcnt,
          });
        }
      });
      fs.unlinkSync(req.file.path); // remove temp file
      //process "fileRows" and respond
      res.json("Done");
    });
};
