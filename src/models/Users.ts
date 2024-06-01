import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: "String",
  phone: "String",
  dob: "Date",
});

const User = mongoose.model("User", userSchema);

export default User;
