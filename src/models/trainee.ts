const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nb: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    businessUnit: {
        type: String,
        required: true
    },
    avatar: String
});

const TraineeModel = mongoose.model("Trainee", schema);
export default TraineeModel;