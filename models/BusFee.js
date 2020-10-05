const mongoose = require("mongoose");

const BusFeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  personId: {
    type: String,
    required: true,
  },
  busFess: [
    {
      busNumber: {
        type: String,
      },
      semesterName: {
        type: String,
      },
      semesterFees: {
        type: String,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      pending: {
        type: Boolean,
        default: true,
      },
      paidFees: {
        type: String,
      },
      pendingFees: {
        type: String,
      },
      fine: {
        type: Boolean,
        default: false,
      },
      fineAmt: {
        type: String,
      },
    },
  ],
});

module.exports = new mongoose.model('BusFee',BusFeeSchema);