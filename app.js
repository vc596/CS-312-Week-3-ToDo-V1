const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');

var items = ["Buy Food", "Sell Food", "Eat Food"];
var workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

let day = date();
    res.render("list", { listTitle: day, newListitems: items });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListitems: workItems });
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});
app.get("/about",function (req,res){

    res.render("about");
}

)
app.listen(8080, function () {
    console.log("Server is running on port 8080");
});
