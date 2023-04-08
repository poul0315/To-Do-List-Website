const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Study for coding", "Spend time with Shaelyn"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    const day = date.getDate(); 
    // let day = date.getDay();
    res.render("list", {
        listTitle: day,
        newListItems: items
    });  
});

app.post("/", function(req, res) {
    const item = req.body.newItem;
    console.log(req.body.list);
    if (req.body.list === "Work") {
        workItems.push(item); 
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List", 
        newListItems: workItems
    });
});

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Connected localhost 3000");
});