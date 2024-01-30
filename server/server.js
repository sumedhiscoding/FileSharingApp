require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./routes/fileUploadRoutes")
const connectDb = require("./config/Dbconnection");
connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);



app.listen(3000,()=>{
  console.log("listening to port 3000")
});
