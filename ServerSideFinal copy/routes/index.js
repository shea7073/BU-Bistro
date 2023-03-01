let express = require('express');
let router = express.Router();

const home = require("./home");
const adminPanel = require("./adminPanel");
const adminMenu = require("./adminMenu");
const adminOrders = require("./adminOrders");
const confirmDeleteDish = require("./confirmDeleteDish");
const deleteDish = require("./deleteDish");
const editDish = require("./editDish");
const submitEditDish = require("./submitEditDish");
const addToMenu = require("./addToMenu");
const submitToMenu = require("./submitToMenu");
const addToOrder = require("./addToOrder")
const cart = require("./cart");
const updateCart = require("./updateCart");
const order = require('./order');
const orderConfirmation = require("./orderConfirmation");
const orderLookup = require("./orderLookup");
const userCancelOrder = require("./userCancelOrder");

const menuJson = require("./menuJson");
const findOrderJson = require("./findOrderJson");
const sendOrderJson = require("./sendOrderJson");

router.get('/', home);
router.get('/add/:id', addToOrder);

router.post('/order', order);
router.get('/order/confirmation/:orderNumber', orderConfirmation);

router.post('/order/lookup', orderLookup);
router.post('/order/user/cancel', userCancelOrder);

router.get('/cart', cart);
router.post('/cart/update/:id/:action', updateCart)

router.get('/admin', adminPanel);
router.get('/admin/menu', adminMenu);
router.get('/admin/orders', adminOrders);

router.get('/admin/menu/delete/:id', confirmDeleteDish);
router.post('/admin/menu/delete', deleteDish);

router.get('/admin/menu/edit/:id', editDish);
router.post('/admin/menu/edit', submitEditDish);

router.get('/admin/menu/add', addToMenu);
router.post('/admin/menu/add', submitToMenu);

router.get('/api/menu', menuJson);
router.get('/api/order/:orderNumber', findOrderJson);
router.post('/api/order', sendOrderJson);

module.exports = router;