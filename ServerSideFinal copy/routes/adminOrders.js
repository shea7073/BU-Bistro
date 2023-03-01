const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

module.exports = async (req , res) => {

    const orders = await Order.find({}).lean();
    res.render('adminOrdersView', {orders: orders});

}