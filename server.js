/* setup nodejs server*/
var express = require('express');
var app = express();//basic express server - node js application
var bodyParser = require('body-parser');

var products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'microwave'
    }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());//read data inside request

//GET request - route to use AND send response
app.get('/products', function(req, res){
    //res.send('SUCCESS');
    res.send({ products: products });
});

//POST request
app.post('/products', function(req, res){//grab data
    var productName = req.body.name;//.name from ajax data
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });
    res.send('Successfully created product.');
});

// PUT request
// :id access id
app.put('/products/:id', function(req, res){
    var id = req.params.id;//id in url
    var newName = req.body.newName;//newName in request body

    var found = false;//stop once finding id

    products.forEach(function(product, index){
        if(!found && product.id === Number(id)){//convert string to number
            product.name = newName;
        }
    });
    res.send('Successfully updated product.');
});

// DELETE request
app.delete('/products/:id', function(req, res){
    var id = req.params.id;//id in url

    var found = false;

    products.forEach(function(product, index){//index for splice method to delete array
        if(!found && product.id === Number(id)){
            products.splice(index, 1);//splice - for adding & removing eles in array. 1 is how many older ele to remove
        }
    });
    res.send('Successfully deleted product.');
});

app.listen();

app.listen(PORT, function(){
    console.log('Server listening on ' + PORT);
});
