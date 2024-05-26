import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactsService.listContacts(req, next)
        );

    } catch (e) {
        next(e);
    }
};

export const getOneContact = async (req, res, next) => {
    const contact = await contactsService.getContact(req, next);
    if (contact) {
        res.status(200).json(
            contact
        );
    } else {
        next(HttpError(404, "Not found"));
    }
};

export const deleteContact = async (req, res, next) => {
    const contact = await contactsService.removeContact(req, next);
    if (contact) {
        res.status(200).json(
            contact
        );
    } else {
        next(HttpError(404, "Not found"));
    }
};

export const createContact = async (req, res, next) => {
    const contact = await contactsService.addContact(req, next)
    if (contact) {
        res.status(201).json(
            contact
        );
    } else {
        next(HttpError(500, "Can't create contact"));
    }
};

export const updateContact = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
        next(HttpError(400, "Body must have at least one field"));
    }
    const contact = await contactsService.updateContact(req, next);
    if (contact) {
        res.status(200).json(
            contact
        );
    } else {
        next(HttpError(404, "Not found"));
    }
};

export const updateStatusContact = async (req, res, next) => {
    const contact = await contactsService.updateStatusContact(req, next);
    if (contact) {
        res.status(200).json(
            contact
        );
    } else {
        next(HttpError(404, "Not found"));
    }
};