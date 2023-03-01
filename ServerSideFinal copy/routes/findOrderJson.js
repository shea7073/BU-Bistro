const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

module.exports = async (req , res) => {

    const orderNumber = req.params.orderNumber;

    const order = await Order.findOne({orderNumber: orderNumber}).lean();
    console.log(order);

    res.format({
        'application/json': () => {
            if (order) {
                res.json(order);
            }
            else {
                res.send('Order not found');
            }
        }
    });

}
