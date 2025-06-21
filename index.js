const express = require("express");
const path = require("path")
const userRoute = require("./routes/url");
const {connectDb} = require("./connect")
const URL = require("./models/url");

const PORT = 8000;
const app = express();

connectDb("mongodb://127.0.0.1:27017/shortly")

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", userRoute)

app.get("/", async(req, res)=>{
    return res.render("url");
})


app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));
