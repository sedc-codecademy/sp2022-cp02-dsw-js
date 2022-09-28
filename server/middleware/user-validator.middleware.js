const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const userValidator = (req, res, next) => {
  const userData = req.body;
  const validation = userSchema.validate(userData);

  if (validation?.error) {
    res.status(400).send({
      message: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userValidator;
