var express = require("express");
var app = express();
var request = require("request");
const { response } = require("express");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/results", function(req, res){
    request("https://api.covid19api.com/summary", function(error, data){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(data["body"]);
            res.render("results", {data: data});
        }
    });
});

app.get("/indiaStats", function(req, res){
    request("https://api.covid19india.org/data.json", function(error, data){
        if(!error && response.statusCode == 200){
            res.render("indiaStats", {data: JSON.parse(data["body"])});
        }
    });
});

app.listen(3000, function(){
    console.log("server has started..!!");
});