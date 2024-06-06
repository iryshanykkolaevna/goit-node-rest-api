import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import {User} from "../models/user.js";

const {PRIVATE_KEY, SALT_ROUNDS = 10, JWT_EXPIRES_IN = "24h"} = process.env;

async function registerUser(req, next) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) throw HttpError(409, "Email in use");

        const passwordHash = await bcrypt.hash(req.body.password, Number(SALT_ROUNDS));
        return User.create({...req.body, password: passwordHash});
    } catch (e) {
        next(e);
    }
}

async function loginUser(req, next) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        if (!await bcrypt.compare(req.body.password, user.password)) {
            throw HttpError(401, "Email or password is wrong");
        }

        const token = jwt.sign({id: user._id}, PRIVATE_KEY, {expiresIn: JWT_EXPIRES_IN});
        return User.findByIdAndUpdate(user._id, {token}, {new: true});
    } catch (e) {
        next(e);
    }
}

async function logOutUser(req, next) {
    try {
        return User.findByIdAndUpdate(req.user.id, {token: null}, {new: true});
    } catch (e) {
        next(e);
    }
}

export default {
    registerUser,
    loginUser,
    logOutUser,
}