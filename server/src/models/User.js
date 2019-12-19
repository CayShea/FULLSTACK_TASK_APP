const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema(
    {
        name: {
            type: String, 
            lowercase: true,
            required: [true, "can't be blank"], 
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
            createIndexes: true,
            unique: true,
        },
    }, {timestamps: true, collection: 'users'}
);

const User = mongoose.model('User', userSchema);

module.exports = User;