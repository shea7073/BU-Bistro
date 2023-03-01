const MenuDB = require('../menuDB');
const Menu = MenuDB.getModel();

module.exports = async (req, res) => {

    let dishObjects = [];
    let total = 0;
    if (req.session.dishes) {
        for (let i = 0; i < req.session.dishes.length; i++) {

            let id = req.session.dishes[i].id;
            let count = req.session.dishes[i].count;

            let dish = await Menu.findById(id, (err, dish) => {
                if (err || !dish) {
                    console.log(err);
                    console.log("Error finding Dish");
                }});
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
        total = total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        req.session.total = total;
        res.render('cartView', {data: dishObjects, price: total, empty: false});

    }
    else {
        res.render('cartView', {empty: true, data: {}, price: 0});
    }
    }

