const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dealSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for deal"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
