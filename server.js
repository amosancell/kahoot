var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.redirect('/startGame');
})

app.get('/startGame', function(req, res) {
    res.render('startGame.ejs');
});

app.listen('4000', function() {
    console.log('listening on 4000');
});

/*
TODO:
make quiz helpers, let person create quiz
then let them serve it 
*/