import { NextFunction } from "express";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: String,
    hash: String
});

// TODO add validation of email
schema.pre("save", function save(next: NextFunction) {
    // const academy = this;
  });


// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const AdminModel = mongoose.model("Admin", schema);
export default AdminModel;