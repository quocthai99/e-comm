const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    cart:[
        {
            price: {type:Number, require: true},
            thumb: {type:String, require: true},
            color: {type:String, require: true},
            quantity: {type:Number, require: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);