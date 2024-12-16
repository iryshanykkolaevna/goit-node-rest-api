import usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import jimp from 'jimp';
import gravatar from 'gravatar';


export const register = async (req, res, next) => {
    try {
        req.body.avatarURL = gravatar.url(req.body.email, {s: '250', r: 'x', d: 'retro'}, true);
        const user = await usersService.registerUser(req, next);
        if (user) {
            res.status(201).json({
                user: {email: user.email, subscription: user.subscription}
            });
        }
    } catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await usersService.loginUser(req, next);
        if (user) {
            res.status(200).json({
                token: user.token,
                user: {email: user.email, subscription: user.subscription}
            });
        }
    } catch (e) {
        next(e);
    }
};

export const logOut = async (req, res, next) => {
    try {
        await usersService.logOutUser(req)
        res.status(204).json({message: "No Content"});
    } catch (e) {
        next(e);
    }
};

export const getCurrent = async (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            email: req.user.email,
            subscription: req.user.subscription,
        });
    } else {
        next(HttpError(401, "Not authorized"));
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const {email, subscription} = await usersService.updateSubscription(req);
        res.status(200).json({
            email,
            subscription
        });
    } catch (e) {
        next(e);
    }
};

export const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) throw next(HttpError(400, "File not found"))

        const { _id } = req.user;
        const { path: tempUpload, filename } = req.file;

        const file = await jimp.read(tempUpload);
        await file.resize(250, 250).writeAsync(tempUpload);

        const newAvaName = `${_id}_${filename}`;
        const newAvaPath = path.resolve("public", "avatars", newAvaName);

        await fs.rename(tempUpload, newAvaPath);
        const avatarURL = path.join('/avatars', newAvaName);

        await usersService.updateAvatar(_id, { avatarURL }, next);
        res.json({ avatarURL: avatarURL });
    } catch (e) {
        next(e);
    }
};