const express = require("express")
const bodyParser= require("body-parser")
var cors = require('cors');

const app = express()

app.use(cors({credentials : true, origin : 'https://campdel.vercel.app/'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const dbConnect = require("./db/dbConnect");

const vendorRoutes = require("./routes/vendorRoutes")
const searchRoutes = require("./routes/searchRoutes")

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

dbConnect()

app.use("/api/vendor",vendorRoutes)
app.use("/api/search",searchRoutes)

module.exports = app