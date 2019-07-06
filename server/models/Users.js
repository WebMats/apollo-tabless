const { Schema, ...mongoose } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
    email: { type: String, require: true },
    hash: { type: String, required: true },
    username: { type: String, require: true, unique: true},
    phone: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);