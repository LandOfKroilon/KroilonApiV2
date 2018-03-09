import { validateEmail } from '../helpers/Validator';

let admin = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    nb: {
        type: Int,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validateEmail
    },
    avatar: String,
    hash: String
});

export default admin;