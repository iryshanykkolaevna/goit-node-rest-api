import Joi from "joi";


export const createShm = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

export const updateShm = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
});

export const updateFavoriteShm = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean().required()
});
export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})