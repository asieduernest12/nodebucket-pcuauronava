"use strict";

const {
  DB_USERNAME = "pcuauronava",
  DB_PASSWORD = "aslan123",
  DB_NAME = "NodebucketDB",
} = process.env;

const CONFIG = {
  DB_URL: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bellevueuniversity.5jww2it.mongodb.net/NodebucketDB?retryWrites=true&w=majority"`,
  DB_NAME: DB_NAME,
};

module.exports = CONFIG;
