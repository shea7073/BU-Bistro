const MenuDB = require('../menuDB');
const Menu = MenuDB.getModel();


module.exports = async (req, res) => {

    const id = req.body.id;
    const dishName = req.body.name;
    const description = req.body.description;
    const isDisplayed = req.body.display;
    const price = req.body.price;
    const stock = req.body.stock;


    Menu.findById(id, (err, dish) => {
        if (err) {
            console.log('Error finding dish');
            res.render('404');
        }
        if (!dish) {
            console.log('Dish not found')
        } else {
            dish.dishName =  dishName;
            dish.description = description;
            dish.isDisplayed= isDisplayed;
            dish.price = price;
            dish.stock = stock;
            dish.save((err) => {
            if (err) {
                console.log(err);
                console.log('Error saving dish')
            }
            res.redirect('/admin/menu');
        })
        }

    })
}