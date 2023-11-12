/**
 * Title: app.js
 * Author: Patrick Cuauro
 * Modified by: 
 * Date: 11/11/2023
 * Description: interface for the backend server
 */
const mongoose = require("mongoose");
// MongoDB connection string
const connString =
  "mongodb+srv://pcuauronava:aslan123@bellevueuniversity.5jww2it.mongodb.net/NodebucketDB";

// const connString = 'mongodb://localhost/nodebucket'
// Still working on this part
mongoose
  .connect(connString ?? "mongodb://localhost:27017/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((error) => console.log("connection failed", error));

module.exports = mongoose;
