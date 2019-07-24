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
    console.log(req.originalUrl);
    var search = req.originalUrl.slice(16,50);
    
    
    request("http://omdbapi.com/?s=" + search + "&apikey=thewdb" , function (error, response, body){
        
    if (JSON.parse(body)["Response"] === "False") {
        console.log("hey");
        req.flash("error", "No movies were found. Please try with another word.");
        res.redirect("/");


    }

    
    else if(!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(JSON.parse(body)["Response"]);
        
        
        res.render("results.ejs", {dataVar : data});
    } 
    
    
    
    });  
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});




