const asyncHandler = require('express-async-handler');

const Order = require('../models/order');

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) throw new Error('please login');
    const { quantity, color, price, pid, thumb } = req.body;
    if (!quantity || !color || !price || !pid || !thumb) throw new Error('Missing inputs');

    const order = await Order.find();
    console.log(order)
    const cart = order.cart.find((item) => item.product.toString() === pid && item.color === color);
    if (cart) {
        const response = await Order.updateOne(
            { cart: { $elemMatch: variant } },
            { $set: { 'cart.$.quantity': quantity, 'cart.$.price': price } },
            { new: true },
        );
        console.log('response:', response)
    } else {
        const response = await Order.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, price, color, thumb } } },
            { new: true },
        );
        console.log('response add:', response);
    }
});

// const updateCart = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     if (!_id) throw new Error('please login');
//     const { quantity, color, price, pid, thumb } = req.body;
//     if (!quantity || !color || !price || !pid || !thumb) throw new Error('Missing inputs');

//     const user = await User.findById(_id).select('cart');
//     const variant = user.cart.find((item) => item.product.toString() === pid && item.color === color);
//     console.log('variant:', variant);
//     console.log('color:', color);
//     if (variant) {
//         const response = await User.updateOne(
//             { cart: { $elemMatch: variant } },
//             { $set: { 'cart.$.quantity': quantity, 'cart.$.price': price } },
//             { new: true },
//         );
//         console.log('response update:', response);
//         if (!response) throw new Error('Product exist');
//         return res.status(200).json({
//             status: true,
//             message: 'Updated your variant',
//         });
//     } else {
//         const response = await User.findByIdAndUpdate(
//             _id,
//             { $push: { cart: { product: pid, quantity, price, color, thumb } } },
//             { new: true },
//         )
//         console.log('response add:', response);
//         if (!response) throw new Error('Product exist');
//         return res.status(200).json({
//             status: true,
//             message: 'Added your variant',
//             newCart: response,
//         });
//     }
// });

module.exports = {
    updateCart,
};
