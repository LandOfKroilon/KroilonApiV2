import { validateEmail } from '../helpers/Validator';

let trainee = new Schema({
    name: {
        type: String,
        required: true
    },
    nb: {
        type: Int,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email must be valid'],
        validate: [validateEmail, 'Please fill a valid email address']
    },
    avatar: String
});

export default trainee;