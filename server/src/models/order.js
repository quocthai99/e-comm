const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    orderItems:[
        {
            name: {type:String, require: true},
            amount: {type:Number, require: true},
            image: {type:String, require: true},
            price: {type:Number, require: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            }
        }
    ],
    shippingAddress:{
        fullname: {type:String, require: true},
        address: {type:String, require: true},
        city: {type:String, require: true},
        country: {type:String, require: true},
        phone: {type:number, require: true},
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    itemsPrice:{
        type:String,
        required:true,
    },
    shippingPrice:{
        type:Number,
        required:true,
    },
    taxPrice:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
    isPaid: {
        type:Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {type: Date}
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);