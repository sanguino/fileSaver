import Joi from 'joi';

export default {
  body: {
    group: Joi.string().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
  },
};
