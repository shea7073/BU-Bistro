module.exports = (req, res) => {
    const id = req.params.id;

    if (req.params.action === 'update') {
        for (let i = 0; i < req.session.dishes.length; i++) {
            if (req.session.dishes[i].id === id) {
                req.session.dishes[i].count = req.body.count;
            }
        }
    }
    else if(req.params.action === 'remove') {
        req.session.dishes = req.session.dishes.filter(dish => dish.id !== id);
    }
    else {
        res.render('404');
    }

    res.redirect("/cart");
}