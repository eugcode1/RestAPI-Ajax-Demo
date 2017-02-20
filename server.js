var express = require('express');
var app = express();

var products = [
    {
        id: 1,
        name: 'laptop'
    },{
        id: 2,
        name: 'microwave'
    }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

//route to use AND RESPOND
app.get('/products', function(req, res){
    //res.send('SUCCESS');
    res.send({ products: products });
});

app.listen();

app.listen(PORT, function(){
    console.log('Server listening on ' + PORT);
});
