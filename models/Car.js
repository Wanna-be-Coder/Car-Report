const mongoose = require("mongoose");

const CarInfoSchema = mongoose.Schema({
  manufacturer: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  prodcnt: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("carInfo", CarInfoSchema);
