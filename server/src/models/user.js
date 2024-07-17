const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        cart: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
                price: Number,
                thumb: String,
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
        refreshToken: {
            type: String,
            require: true,
        },
        accessToken: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('User', userSchema);
