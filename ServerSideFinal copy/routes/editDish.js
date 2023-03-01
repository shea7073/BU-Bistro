const MenuDB = require("../menuDB");
const Menu = MenuDB.getModel();

module.exports = (req, res) => {

    let id = req.params.id;

    Menu.findById(id, (err, dish) => {
        if (err) {
            console.log("Dish ID not found")
            res.render('404');
        }
        else {
            res.render('EditDishView', {
                title: 'Edit Dish',
                data: {
                    id: dish._id,
                    dishName: dish.dishName,
                    description: dish.description,
                    isDisplayed: dish.isDisplayed,
                    price: dish.price,
                    stock: dish.stock,
                }});
        }
    });
}