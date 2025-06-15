const cors = require("cors");
const apiRoutes = require("./routes");
const express = require("express");
const { join } = require("path");

/**
 * Registers all api routes with the express app.
 * @param  {object} config an exoress app instalce
 * @return {Promise} return resolved promise
 */

module.exports = function loadRoutes(app, configs) {
  return new Promise((resolve, reject) => {
    // cors and body parser setup
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // serve static files for react app
    app.use(app.express.static(join(process.cwd(), "client/dist")));

    app.use(`${configs.API_PATH}/v${configs.VERSION}`, apiRoutes);

    // error handling routes
    app.use((req, res, next) => {
      next({
        status: 404,
        errors: {
          request: "requested resource not found",
        },
        message: "Bad Reuest",
      });
    });

    app.use(({ status, errors, message }, req, res, next) => {
      res.status(status || 500).json({
        data: null,
        errors,
        message,
      });
    });

    // resolve promise
    resolve();
  });
};
