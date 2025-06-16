const cors = require("cors");
const apiRoutes = require("./routes");
const express = require("express");
const { join } = require("path");
const clientDistPath = join(__dirname, "..", "..", "..", "client", "dist");

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
    app.use(app.express.static(join(clientDistPath)));

    app.use(`${configs.API_PATH}/v${configs.VERSION}`, apiRoutes);

    // Serve index.html for client-side routing (React Router)
    app.get("/{*all}", (req, res, next) => {
      if (
        req.method === "GET" &&
        !req.path.startsWith(`${configs.API_PATH}/v${configs.VERSION}`)
      ) {
        res.sendFile(join(clientDistPath, "index.html"));
      } else {
        next();
      }
    });

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
