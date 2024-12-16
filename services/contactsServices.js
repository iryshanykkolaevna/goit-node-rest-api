import {Contact} from "../models/contact.js";

async function listContacts(req, next) {
    const userId = req.user._id;
    const fvrArrParams = req.query.favorite ? [req.query.favorite] : [true, false];
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    try {
        const contacts = await Contact.find({owner: userId, favorite: {$in: fvrArrParams}},
            null, {skip, limit});
        return contacts || [];
    } catch (e) {
        next(e);
    }
}

async function getContact(req, next) {
    try {
        return await Contact.findOne({_id: req.params.id, owner: req.user._id});
    } catch (e) {
        next(e)
    }
}

async function removeContact(req, next) {
    try {
        return await Contact.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    } catch (e) {
        next(e);
    }
}

async function addContact(req, next) {
    try {
        return await Contact.create({...req.body, owner: req.user._id});
    } catch (e) {
        next(e);
    }
}

async function updateContact(req, next) {
    try {
        return await Contact.findOneAndUpdate({_id: req.params.id, owner: req.user._id},
            req.body, {new: true});
    } catch (e) {
        next(e);
    }
}

async function updateStatusContact(req, next) {
    try {
        return await Contact.findOneAndUpdate({_id: req.params.id, owner: req.user._id},
            {favorite: req.body.favorite}, {new: true});
    } catch (e) {
        next(e);
    }
}

export default {
    listContacts,
    getContact,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}