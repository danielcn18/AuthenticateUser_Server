const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String, 
        required: [true, "Your email address is required"],
        unique: true
    },
    username: {
        type: String, 
        require: [true, "Your username is required"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
    createAt: {
        type: Date,
        default: new Date()
    },
}, {
    collection: 'users',
    timestamps: true
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);