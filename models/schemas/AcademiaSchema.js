import { validateEmail } from '../helpers/Validator';

let sessionSchema = require('./schemas/Session');
let adminSchema = require('./schemas/Admin');
let traineeSchema = require('./schemas/Trainee');

let Admin = mongoose.model('Admins', adminSchema);

let academySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
    trainees: [traineeSchema],
    sessions: [sessionSchema],
    formadores: [adminSchema],
    dailyMessage: { type: String, default: '#ficaadica' },
    createdOn: { type: Date, default: Date.now },
});

let Academy = mongoose.model('Academias', academySchema);


