const menuDB = require('../menuDB.js');
const Menu = menuDB.getModel();

module.exports = async (req , res) => {

    let food = await Menu.find({});

    let results = food.map( food => {
        return {
            id: food._id,
            dishName: food.dishName,
            description: food.description,
            isDisplayed: food.isDisplayed,
            price: food.price,
            stock: food.stock,
        }
    });
    let displayedCount = 0;
    for (let i = 0; i < results.length; i++ ) {
        if (results[i].isDisplayed) {
            displayedCount += 1;
        }
    }

    res.render('showMenuView', {title: 'BU Bistro', data: results, displayedCount: displayedCount});
};