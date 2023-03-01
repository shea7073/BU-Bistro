const menuDB = require('../menuDB.js');
const Menu = menuDB.getModel();

const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();


// This endpoint accepts an array of objects, each with a property "dishName" and "quantity"
// In any dish that has spaces, replace the spaces with a "-" character
// the json representation of the order is returned

module.exports = async (req , res) => {

    const dishes = [];

    for (let i = 0; i < req.body.length; i++){
        dishes.push({
            "dishName": req.body[i].dishName.replace("-", " "),
            "quantity": req.body[i].quantity
        });
    }

    console.log(dishes);

    res.format({
        'application/json': async () => {

            let total = 0;
            const badStock = [];
            let orderDishes = [];

            for (let i = 0; i < dishes.length; i++) {
                let dish = await Menu.findOne({dishName: dishes[i].dishName}, (err, dish) => {
                    if (err || !dish) {
                        console.log(err);
                        console.log("Error finding Dish");
                    }
                });
                if (dish.stock < dishes[i].quantity) {
                    badStock.push({dishName: dish.dishName, stock: dish.stock, requested: dishes[i].quantity});
                }
                else {
                    const newStock = dish.stock - dishes[i].quantity;
                    dish.update({stock: newStock}, (err) => {
                        if (err) {
                            console.log(err);
                            console.log('Error updating stock');
                        }
                    });
                }
                orderDishes.push({
                    id: dish._id,
                    dishName: dish.dishName,
                    description: dish.description,
                    isDisplayed: dish.isDisplayed,
                    price: dish.price,
                    stock: dish.stock,
                    count: dishes[i].quantity
                });
                total += (dish.price * dishes[i].quantity);
            }
            if (badStock.length > 0) {
                res.send('Stock Error: Please try order again');
            }
            else {
                total = total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                const orderNumber = Math.floor(Math.random() * 10000);

                const order = new Order({
                    orderNumber: orderNumber,
                    dishes: orderDishes,
                    total: total
                });

                order.save((err) => {
                    if (err) {
                        res.send(`${err} \n Error saving your order. Please try again.`)
                    }
                    res.json(order);
                })
            }
        }
    });

}