const menuDB = require('../menuDB.js');
const Menu = menuDB.getModel();

const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

module.exports = async (req , res) => {

    let dishObjects = [];
    let total = 0;

    let badStock = [];

    if (req.session.dishes) {
        for (let i = 0; i < req.session.dishes.length; i++) {

            let id = req.session.dishes[i].id;
            let count = req.session.dishes[i].count;

            let dish = await Menu.findById(id, (err, dish) => {
                if (err || !dish) {
                    console.log(err);
                    console.log("Error finding Dish");
                }});

            if (dish.stock < count) {
                badStock.push({dishName: dish.dishName, stock: dish.stock, requested: count});
            }
            else {
                const newStock = dish.stock - count;
                dish.update({stock: newStock}, (err) => {
                    if (err) {
                        console.log(err);
                        console.log('Error updating stock');
                    }
                });
            }
            dishObjects.push({
                id: dish._id,
                dishName: dish.dishName,
                description: dish.description,
                isDisplayed: dish.isDisplayed,
                price: dish.price,
                stock: dish.stock,
                count: count
            });
            total += (dish.price * count);
        }

        if (badStock.length > 0) {
            res.render("stockErrorView", {data: badStock});
        } else {

            total = total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            req.session.total = total;

            const orderNumber = Math.floor(Math.random() * 10000);

            const order = new Order({
                orderNumber: orderNumber,
                dishes: dishObjects,
                total: total
            });

            order.save((err) => {
                if (err) {
                    console.log(err);
                    console.log("Error placing order");
                    res.redirect('404');
                }
                req.session.destroy();
                res.redirect(`/order/confirmation/${orderNumber}`);
            })
        }
        }
}
