const MenuDB = require('../menuDB');
const Menu = MenuDB.getModel();

module.exports = async (req, res) => {

    const id = req.params.id;
    let match = false;

    if (req.session.dishes) {
        for (let i = 0; i < req.session.dishes.length; i++) {
            if (req.session.dishes[i].id === id) {
                req.session.dishes[i].count += 1;
                match = true;
            }
        }
        if (!match){
            req.session.dishes.push({id: id, count: 1});
        }
    }
    else {
        req.session.dishes = [{id: id, count: 1}];
    }
    res.redirect('/');
}