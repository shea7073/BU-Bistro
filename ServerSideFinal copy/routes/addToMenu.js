const menuDB = require('../menuDB');
const Menu = menuDB.getModel();

module.exports = async (req , res) => {
    res.render('addToMenuView', {title: 'Menu - Add'});
};
