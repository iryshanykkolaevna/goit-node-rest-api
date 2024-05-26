import express from "express";
import validateBody from "../helpers/validateBody.js";
import {validateId} from "../helpers/validateId.js";
import {validateJWT} from "../helpers/validateJWT.js";
import * as ctrl from "../controllers/contactsControllers.js";
import {createShm, updateShm, updateFavoriteShm} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", validateJWT, ctrl.getAllContacts);
contactsRouter.get("/:id", validateJWT, validateId, ctrl.getOneContact);
contactsRouter.delete("/:id", validateJWT, validateId, ctrl.deleteContact);
contactsRouter.post("/", validateJWT, validateBody(createShm), ctrl.createContact);
contactsRouter.put("/:id", validateJWT, validateId, validateBody(updateShm), ctrl.updateContact);
contactsRouter.patch('/:id/favorite', validateJWT, validateId, validateBody(updateFavoriteShm), ctrl.updateStatusContact);

export default contactsRouter;