const menuDB = require('../menuDB');
const Menu = menuDB.getModel();


module.exports = async (req , res) => {

    let food = await Menu.find({});

    let results = food.map( food => {
        return {
            id : food.id,
            dishName: food.dishName,
            description: food.description,
            isDisplayed: food.isDisplayed,
            price: food.price,
            stock: food.stock,
        }
    });

    res.render('adminMenuView', {title: 'Admin Menu', data: results});

};