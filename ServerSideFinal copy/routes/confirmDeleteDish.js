const menuDB = require('../menuDB');
const Menu = menuDB.getModel();


module.exports = async (req , res) => {

    const dishId = req.params.id;

    Menu.findById(dishId, (err, dish) => {
        if (err) {
            console.log("Dish ID not found")
            res.render('404');
        }
        else {
            res.render('deleteDishView', {
                title: 'Delete Dish',
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
};