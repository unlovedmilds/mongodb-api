const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");

var app = Express();

Mongoose.connect("mongodb://localhost/thepolygotdeveloper");

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

const PersonModel = Mongoose.model("person",{

name: String,
email: String


});

app.post("/person", async(request, response, next) => {   

    try{
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    }catch(e){
        response.status(500).send(e);
    }

});

app.get("/people", async (request, response , next) => {


    try{
        
        var result = await PersonModel.find().exec();
        response.send(result);
    }catch(e){
        response.status(500).send(e);
    }

});

app.get("/person/:id", async (request, response , next) => {


    try{
        
        var result = await PersonModel.findById(request.params.id).exec();
        response.send(result);
    }catch(e){
        response.status(500).send(e);
    }

});

app.put("/person/:id", async (request, response , next) => {


    try{
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    }catch(e){
        response.status(500).send(e);
    }

});

app.delete("/person/:id", async (request, response , next) => {


    try{
        
        var result = await PersonModel.deleteOne(request.params.id).exec();
        response.send(result);
    }catch(e){
        response.status(500).send(e);
    }

});

app.listen(3000,() => {
    console.log("Listening at 3000....");
});