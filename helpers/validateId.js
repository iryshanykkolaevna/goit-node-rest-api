import { isValidObjectId } from 'mongoose';
import HttpError from "./HttpError.js";

export const validateId = (req, _, next) => {
    if (!isValidObjectId(req.params.id)) {
        next(HttpError(400, "Invalid 'id' parameter"));
    }
    next();
};