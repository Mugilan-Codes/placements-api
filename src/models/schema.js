import Joi from 'joi';

const schema = {
  registerStudent: Joi.object().keys({
    register_no: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(50).required(),
    confirm_password: Joi.ref('password'),
    course_id: Joi.string().max(15),
  }),
  loginStudent: Joi.object()
    .keys({
      register_no: Joi.string()
        .min(6)
        .max(15)
        .pattern(/^[0-9]/)
        .messages({
          'string.pattern.base': `{#key} can contain only numbers`,
          'string.empty': `{#key} should not be empty`,
          'string.min': `{#key} should have a minimum length of {#limit}`,
          'string.max': `{#key} should have a maximum length of {#limit}`,
        }),
      email: Joi.string()
        .email()
        .messages({ 'string.email': `{#key} should be a valid email` }),
      password: Joi.string()
        .alphanum()
        .min(8)
        .max(50)
        .required()
        .messages({ 'any.required': `{#key} is absolutely required` }),
    })
    .xor('register_no', 'email')
    .messages({
      'object.xor': `Must contain only one of the fields: {#peers}`,
      'object.missing': `One of the Fields is Required: {#peers}`,
    }),
  addCourse: Joi.object().keys({
    degree: Joi.string().uppercase().valid('UG', 'PG').required(),
    type: Joi.string().uppercase().valid('R', 'SS'),
    short_name: Joi.string().max(25).required(),
    course_name: Joi.string().max(75).required(),
    department: Joi.string().max(75).required(),
  }),
};

export default schema;
