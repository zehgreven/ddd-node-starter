import * as joi from 'joi';

module.exports = {
  body: {
    login: joi.string().max(255).required(),
    password: joi
      .string()
      .min(6)
      .max(30)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
  },
};
