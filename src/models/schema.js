import Joi from 'joi';

const schema = {
  registerStudent: Joi.object().keys({
    register_no: Joi.string().min(6).required(), //! Validate only numbers
    reg_no: Joi.string()
      .min(6)
      .error(new Error('Atleast 6'))
      .regex(/^$/)
      .error(new Error('Must contain only ')),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    stud_email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50).required(),
    confirm_password: Joi.ref('password'),
  }),
};

export default schema;
