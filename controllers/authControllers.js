import authService from "../services/authServices.js";
import gravatar from 'gravatar';


export const register = async (req, res, next) => {
    try {
        req.body.avatarURL = gravatar.url(req.body.email, {s: '250', r: 'x', d: 'retro'}, true);
        const user = await authService.registerUser(req, next);
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
        const user = await authService.loginUser(req, next);
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
        await authService.logOutUser(req)
        res.status(204).json({message: "No Content"});
    } catch (e) {
        next(e);
    }
};