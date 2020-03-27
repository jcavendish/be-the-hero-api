const express = require("express");
const routes = express.Router();
const ongsController = require("./controllers/OngsController");
const incidentsController = require("./controllers/IncidentsController");
const profileController = require("./controllers/ProfileController");
const sessionController = require("./controllers/SessionController");
const ongsValidator = require("./validators/OngsValidator");
const incidentsValidator = require("./validators/IncidentsValidator");
const sessionValidator = require("./validators/SessionValidator");
const profileValidator = require("./validators/ProfileValidator");

routes.get("/ongs", ongsController.index);
routes.post("/ongs", ongsValidator.create, ongsController.create);

routes.get("/incidents", incidentsController.index);
routes.post("/incidents", incidentsValidator.create, incidentsController.create);
routes.delete("/incidents/:id", incidentsValidator.delete, incidentsController.delete);

routes.get("/profile", profileValidator.create, profileController.index);

routes.post("/session", sessionValidator.create, sessionController.create);

module.exports = routes;