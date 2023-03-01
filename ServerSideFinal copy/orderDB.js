const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderNumber: Number,
    dishes: [{}],
    total: String
});

module.exports = {
    getModel: () => {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            model = connection.model("OrderModel",
                orderSchema);
        };
        return model;
    }
};









