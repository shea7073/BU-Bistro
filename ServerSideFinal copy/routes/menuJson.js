const menuDB = require('../menuDB.js');
const Menu = menuDB.getModel();

module.exports = async (req , res) => {

    const menu = await Menu.find();

    res.format({
        'application/json': () =>
            res.json(menu)
    });

}
