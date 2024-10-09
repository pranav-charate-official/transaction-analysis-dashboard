import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
   },
   category: {
      type: String,
   },
   image: {
      type: String,
   },
   sold: {
      type: Boolean,
   },
   month: {
      type: String,
      enum: [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ],
      required: true,
   },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
