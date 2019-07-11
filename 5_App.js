var express = require("express");
var app = express();
var request = require("request");
var flash = require("connect-flash")

app.use(require("express-session")({
    secret: "flashy",
    resave: false,
    saveUninitialized:false
}));

  app.use(flash());


app.get("/", function(req, res){
    res.render("search.ejs", {message: req.flash("error")});
});

app.get("/results", function(req, res){
    var search = req.query.search;
    
    //outra maneira de fazer o mesmo
    //var url = "\"http://omdbapi.com/?s="/"" + search + "\"&apikey=thewdb"/"";
    request("http://omdbapi.com/?s=" + search + "&apikey=thewdb" , function (error, response, body){
        
    if (JSON.parse(body)["Response"] === "False") {
        console.log("hey");
        req.flash("error", "No movies were found. Please try with another word.");
        res.redirect("/");


    }

    
    else if(!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(JSON.parse(body)["Response"]);
        //tentando criar uma variavel. mas nao precisou!
         //var poster = data["Search"][0]["Poster"];
         
         //testando ate achar a data para poster links
        // console.log(data["Search"][0]["Poster"]);
        
        res.render("results.ejs", {dataVar : data});
    } 
    
    
    
    });  
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});




