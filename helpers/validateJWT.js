import jwt from 'jsonwebtoken';
import HttpError from "./HttpError.js";
import {User} from "../models/user.js";

const {PRIVATE_KEY} = process.env;

export const validateJWT = async (req, _, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error();
        const token = authHeader.slice(7);

        const {id} = jwt.verify(token, PRIVATE_KEY);
        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, "Not authorized"));
    }

};