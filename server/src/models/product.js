const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);



/**
 * {
  "_id": ObjectId("60d9c7e5f0532a26701b34ab"),
  "name": "Patio Dining Set",
  "description": "A stylish outdoor dining set for your patio or garden.",
  "category": "Outdoor Furniture",
  "variants": [
    {
      "sku": "PDS001",
      "color": "Brown",
      "size": "4-Seater",
      "price": 499.99,
      "stock": 20
    },
    {
      "sku": "PDS002",
      "color": "Grey",
      "size": "6-Seater",
      "price": 699.99,
      "stock": 15
    },
    {
      "sku": "PDS003",
      "color": "White",
      "size": "4-Seater",
      "price": 549.99,
      "stock": 10
    }
  ]
}

 */