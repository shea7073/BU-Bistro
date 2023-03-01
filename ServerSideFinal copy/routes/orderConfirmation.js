module.exports = (req, res) => {
    const orderNumber = req.params.orderNumber;
    res.render('orderConfirmationView', {orderNumber: orderNumber});
}