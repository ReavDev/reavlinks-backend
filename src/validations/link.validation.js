const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLink = {
  body: Joi.object().keys({
    originalUrl: Joi.string().uri().required(),
    slug: Joi.string().alphanum().min(4).max(50),
    password: Joi.string().min(4),
    expirationDate: Joi.date().greater('now'),
  }),
};

const getLinks = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLink = {
  params: Joi.object().keys({
    linkId: Joi.string().custom(objectId),
  }),
};

const updateLink = {
  params: Joi.object().keys({
    linkId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      originalUrl: Joi.string().uri(),
      slug: Joi.string().alphanum().min(4).max(50),
      password: Joi.string().allow(null, '').min(4),
      expirationDate: Joi.date().greater('now').allow(null),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteLink = {
  params: Joi.object().keys({
    linkId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLink,
  getLinks,
  getLink,
  updateLink,
  deleteLink,
};
