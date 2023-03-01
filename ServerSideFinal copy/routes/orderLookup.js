const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

module.exports = async (req , res) => {

    const orderNumber = req.body.orderNumber;

    const order = await Order.findOne({orderNumber: orderNumber}).lean();

    if (order) {
        res.render('orderLookupView', {order: order});
    }
    else {
        res.render('orderNotFoundView.handlebars', {orderNumber: orderNumber});
    }



}