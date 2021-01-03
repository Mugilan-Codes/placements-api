import Joi from 'joi';

// Reuseable Fields
const register_no = Joi.string()
  .min(6)
  .max(15)
  .pattern(/^[0-9]{6,15}$/)
  .messages({
    'string.pattern.base': `{#key} can contain only numbers`,
    'string.empty': `{#key} should not be empty`,
    'string.min': `{#key} should have a minimum length of {#limit}`,
    'string.max': `{#key} should have a maximum length of {#limit}`,
  });
const email = Joi.string().email().messages({
  'string.email': `{#key} should be a valid email`,
  'string.empty': `{#key} should not be empty`,
});
//? Possible pattern replacement for password:
//? /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
//? /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#\$%\^\&*\)\(\[\]\{\}+=._-]).{8,16}$/
const password = Joi.string().alphanum().min(8).max(50).required().messages({
  'any.required': `{#key} is a required field`,
  'string.alphanum': `{#key} must contain only alpha-numeric characters`,
  'string.empty': `{#key} should not be empty`,
  'string.min': `{#key} should have a minimum length of {#limit}`,
  'string.max': `{#key} should have a maximum length of {#limit}`,
});
const useNumber = Joi.number().min(0).messages({
  'number.base': `{#key} should be a valid number`,
  'number.min': `{#key} must be greater than or equal to {#limit}`,
  'number.max': `{#key} must be less than or equal to {#limit}`,
});

// Schemas
const courseSchema = {
  add: Joi.object().keys({
    degree: Joi.string().uppercase().valid('UG', 'PG').required(),
    type: Joi.string().uppercase().valid('R', 'SS'),
    short_name: Joi.string().max(25).required(),
    course_name: Joi.string().max(75).required(),
    department: Joi.string().max(75).required(),
  }),
};

const studentSchema = {
  register: Joi.object().keys({
    register_no: register_no
      .required()
      .messages({ 'any.required': `{#key} is a required field` }),
    name: Joi.string().min(3).required().messages({
      'any.required': `{#key} is a required field`,
      'string.empty': `{#key} should not be empty`,
      'string.min': `{#key} should have a minimum length of {#limit}`,
    }),
    email: email
      .required()
      .messages({ 'any.required': `{#key} is a required field` }),
    password,
    confirm_password: Joi.any().valid(Joi.ref('password')).messages({
      'any.only': `{#key} not match`,
    }),
    course_id: Joi.string().max(15),
  }),
  login: Joi.object()
    .keys({
      register_no,
      email,
      password,
    })
    .xor('register_no', 'email')
    .messages({
      'object.xor': `Must contain only one of the fields: {#peers}`,
      'object.missing': `One of the Fields is Required: {#peers}`,
      'object.unknown': `{#key} is not a valid field`,
    }),
  registerParam: Joi.object().keys({ register_no }),
};

const marksSchema = {
  add: Joi.object()
    .keys({
      // /^[0-9]{1,2}[.]{0,1}[0-9]{0,2}$/
      cgpa: useNumber.max(10).required().messages({
        'any.required': `{#key} is a required field`,
        'number.max': `{#key} must be less than or equal to {#limit}`,
      }),
      // Set default to 0 when not provided
      active_backlog: useNumber,
      backlog_history: useNumber,
    })
    .messages({ 'object.unknown': `{#key} is not a valid field` }),
};

const educationSchema = {
  add: Joi.object()
    .keys({
      board_10th: Joi.string().required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
      }),
      percentage_10th: useNumber.max(100).required().messages({
        'any.required': `{#key} is a required field`,
        'number.max': `{#key} must be less than or equal to {#limit}`,
      }),
      board_12th: Joi.string().required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
      }),
      percentage_12th: useNumber.max(100).required().messages({
        'any.required': `{#key} is a required field`,
        'number.max': `{#key} must be less than or equal to {#limit}`,
      }),
      grad_course: Joi.string().messages({
        'string.empty': `{#key} should not be empty`,
      }),
      grad_percentage: useNumber.max(100).messages({
        'number.max': `{#key} must be less than or equal to {#limit}`,
      }),
    })
    .messages({ 'object.unknown': `{#key} is not a valid field` }),
};

export const schema = {
  student: studentSchema,
  course: courseSchema,
  marks: marksSchema,
  education: educationSchema,
};
