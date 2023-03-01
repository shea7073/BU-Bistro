const menuDB = require('../menuDB.js');
const Menu = menuDB.getModel();

module.exports = async (req , res) => {

    const newDish = new Menu(
        {
            dishName : req.body.name,
            description : req.body.description,
            isDisplayed : req.body.display,
            price : req.body.price,
            stock : req.body.stock
        }
    );

    newDish.save((err) => {
        if (err) {
            console.log(err);
            console.log("Error adding dish");
            res.redirect('404');
        }
        res.redirect('/admin/menu');
    })

}
