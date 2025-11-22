import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    uniqueCode: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    analytics: {
      type: Number,
      default: 0,
    },
    lastClicked: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
