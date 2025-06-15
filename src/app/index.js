const express = require("express");
const dbConnect = require("./db.loader");
const routeLoader = require("./routes.loader");
const config = require("../configs");
const app = express();

app.express = express;

/**
 * @desc Loads all resources needed for the full funtioning of the app
 * Loads Db connection
 * Loads Routes
 */
const loadAll = (app) =>
  Promise.all([dbConnect(config), routeLoader(app, config)])
    .then(() => console.log(`resources have been loaded`))
    .catch(process.exit);

app.loadAll = loadAll;

module.exports = app;
