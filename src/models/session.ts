const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    name: String,
    player_id: Number,
    player_name: String,
    points: Number,
    type: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const SessionModel = mongoose.model("Session", schema);
export default SessionModel;