const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        thumb: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        description: {
            type: Array,
            required: true,
        },
        variants: [
            {
                color: String,
                price: Number,
                thumb: String,
                images: Array,
            },
        ],
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
