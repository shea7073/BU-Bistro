const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');


const app = express();


app.engine('handlebars', handlebars({defaultLayout: 'index', helpers: {
        multiply: function (price, count) {
            return price * count;
        }}}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'very_secure_secret'
}))

let routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(3000, function(){
    console.log('http://localhost:3000');
});

