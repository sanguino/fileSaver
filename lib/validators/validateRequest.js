import Joi from 'joi';

export default {
  body: {
    group: Joi.string().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    fixture: Joi.string().required(),
  },
};
