const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/game/:type", (req, res) => {
    const type = req.params.type;
    res.render("game", { type });
})

app.listen(3000);