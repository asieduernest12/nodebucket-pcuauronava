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
  .then(() => console.log("connetion successfull"))
  .catch((error) => console.log("connection failed", error));

module.exports = mongoose;
