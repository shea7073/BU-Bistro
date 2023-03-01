const MenuDB = require('../menuDB');
const Menu = MenuDB.getModel();


module.exports = async (req, res) => {

    let id = req.body.id;

    Menu.findById(id, (err, dish) => {
            if (err || !dish) {
                console.log(err);
                console.log("Error finding Dish")
                res.render('404');
            }
        }).remove((err) => {
            if (err) {
                console.log(err)
                console.log('Error deleting dish...');
                res.render('404');
            } else {
                res.redirect('/admin/menu');
            }
    });
}
