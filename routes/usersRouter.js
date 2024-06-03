import express from "express";
import validateBody from "../helpers/validateBody.js";
import {validateJWT} from "../helpers/validateJWT.js";
import * as ctrl from "../controllers/usersControllers.js";
import {registerShm, loginShm, sbscrUpdateShm} from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerShm), ctrl.register);
usersRouter.post("/login", validateBody(loginShm), ctrl.login);
usersRouter.post("/logout", validateJWT, ctrl.logOut);
usersRouter.get("/current", validateJWT, ctrl.getCurrent);
usersRouter.patch("/", validateJWT, validateBody(sbscrUpdateShm), ctrl.updateSubscription);

export default usersRouter;