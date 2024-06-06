import express from "express";
import validateBody from "../helpers/validateBody.js";
import {validateJWT} from "../helpers/validateJWT.js";
import * as ctrl from "../controllers/usersControllers.js";
import {sbscrUpdateShm} from "../schemas/usersSchemas.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.get("/current", validateJWT, ctrl.getCurrent);
usersRouter.patch("/", validateJWT, validateBody(sbscrUpdateShm), ctrl.updateSubscription);
usersRouter.patch('/avatars', validateJWT, upload.single('avatar'), ctrl.updateAvatar);

export default usersRouter;