import {User} from "../models/user.js";


async function updateSubscription(req, next) {
    try {
        return User.findByIdAndUpdate(req.user._id, {subscription: req.body.subscription}, {new: true});
    } catch (e) {
        next(e);
    }
}

async function updateAvatar(_id, avatarURL, next) {
    try {
        return User.findByIdAndUpdate(_id, avatarURL, {new: true});
    } catch (e) {
        next(e);
    }
}

export default {
    updateSubscription,
    updateAvatar
}