import { NextFunction } from "express";
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    trainees: Array,
    sessions: Array,
    admins: Array,
    dailyMessage: {
        type: String,
        default: "#ficaadica"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


// TODO add validation of email
schema.pre("save", function save(next: NextFunction) {
    // const academy = this;
  });


// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const AcademyModel = mongoose.model("Academy", schema);
export default AcademyModel;