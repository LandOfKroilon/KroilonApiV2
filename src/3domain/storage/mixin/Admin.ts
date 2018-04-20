import mongoose from "mongoose";
import IAdmin from "../pojo/IAdmin";

interface IAdminModel extends IAdmin, mongoose.Document {

}

const adminSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: false,
        default: new Date()
    }
}, { _id: false });




const Admin = mongoose.model<IAdminModel>("Admin", adminSchema);

export { Admin };