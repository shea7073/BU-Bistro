const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

module.exports = async (req , res) => {

    const orderNumber = req.body.orderNumber;

    await Order.findOne({orderNumber: orderNumber}, (err, order) => {
        if (err || !order) {
            console.log(err);
            console.log("Error deleting order")
            res.render('404');
        }
    }).remove((err) => {
        if (err) {
            console.log(err)
            console.log('Error deleting order...');
            res.render('404');
        } else {
            res.redirect('/');
        }
    });
}
//maybe add splash page for deleted orders