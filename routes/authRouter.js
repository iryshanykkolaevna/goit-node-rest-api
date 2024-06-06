import express from "express";
import validateBody from "../helpers/validateBody.js";
import {validateJWT} from "../helpers/validateJWT.js";
import * as ctrl from "../controllers/authControllers.js";
import {registerShm, loginShm} from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerShm), ctrl.register);
authRouter.post("/login", validateBody(loginShm), ctrl.login);
authRouter.post("/logout", validateJWT, ctrl.logOut);


export default authRouter;