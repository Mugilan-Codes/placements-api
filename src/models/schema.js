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
const name = Joi.string().min(3).messages({
  'string.empty': `{#key} should not be empty`,
  'string.min': `{#key} should have a minimum length of {#limit}`,
});
// /^[0-9]{1,2}[.]{0,1}[0-9]{0,2}$/
const cgpa = useNumber.max(10).messages({
  'number.max': `{#key} must be less than or equal to {#limit}`,
});
const percentage = useNumber.max(100).messages({
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
  idParam: Joi.object().keys({
    course_id: Joi.string().max(15).messages({
      'string.max': `{#key} should have a maximum length of {#limit}`,
    }),
  }),
};

const adminSchema = {
  register: Joi.object()
    .keys({
      name: name
        .required()
        .messages({ 'any.required': `{#key} is a required field` }),
      email: email
        .required()
        .messages({ 'any.required': `{#key} is a required field` }),
      password,
      confirm_password: Joi.any().valid(Joi.ref('password')).messages({
        'any.only': `{#key} not match`,
      }),
    })
    .messages({ 'object.unknown': `{#key} is not a valid field` }),
  login: Joi.object()
    .keys({
      email: email
        .required()
        .messages({ 'any.required': `{#key} is a required field` }),
      password,
    })
    .messages({ 'object.unknown': `{#key} is not a valid field` }),
};

const studentSchema = {
  register: Joi.object().keys({
    register_no: register_no
      .required()
      .messages({ 'any.required': `{#key} is a required field` }),
    name: name
      .required()
      .messages({ 'any.required': `{#key} is a required field` }),
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
  update: Joi.object()
    .keys({
      name: Joi.string().min(3).messages({
        'string.empty': `{#key} should not be empty`,
        'string.min': `{#key} should have a minimum length of {#limit}`,
      }),
      email,
      course_id: Joi.string().max(15).messages({
        'string.max': `{#key} should have a maximum length of {#limit}`,
      }),
    })
    .or('name', 'email', 'course_id')
    .messages({
      'object.missing': `One of the Fields is Required: {#peers}`,
      'object.unknown': `{#key} is not a valid field`,
    }),
};

const marksSchema = {
  add: Joi.object()
    .keys({
      cgpa: cgpa.required().messages({
        'any.required': `{#key} is a required field`,
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
      tenth_board: Joi.string().required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
      }),
      tenth_percentage: percentage.required().messages({
        'any.required': `{#key} is a required field`,
      }),
      twelfth_board: Joi.string().required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
      }),
      twelfth_percentage: percentage.required().messages({
        'any.required': `{#key} is a required field`,
      }),
      grad_course: Joi.string().messages({
        'string.empty': `{#key} should not be empty`,
      }),
      grad_percentage: percentage,
    })
    .messages({ 'object.unknown': `{#key} is not a valid field` }),
};

const listingSchema = {
  add: Joi.object()
    .keys({
      title: Joi.string().max(50).required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
        'string.max': `{#key} should have a maximum length of {#limit}`,
      }),
      description: Joi.string().max(255).required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
        'string.max': `{#key} should have a maximum length of {#limit}`,
      }),
      company_name: Joi.string().max(50).required().messages({
        'any.required': `{#key} is a required field`,
        'string.empty': `{#key} should not be empty`,
        'string.max': `{#key} should have a maximum length of {#limit}`,
      }),
      start_date: Joi.date().greater('now').iso().required().messages({
        'date.base': `{#key} should be a valid date`,
        'date.format': `Does not match date format "{#format}"`,
        'date.greater': `{#limit} should be the minimum`,
      }),
      tenth_percentage: percentage,
      twelfth_percentage: percentage,
      grad_percentage: percentage,
      current_cgpa: cgpa,
      active_backlog: useNumber,
      backlog_history: useNumber,
    })
    .or(
      'tenth_percentage',
      'twelfth_percentage',
      'grad_percentage',
      'current_cgpa',
      'active_backlog',
      'backlog_history'
    )
    .messages({
      'object.missing': `{#peersWithLabels} One of the Fields is Required: {#peers}`,
      'object.unknown': `{#key} is not a valid field`,
    }),
};

export const schema = {
  admin: adminSchema,
  student: studentSchema,
  course: courseSchema,
  marks: marksSchema,
  education: educationSchema,
  listing: listingSchema,
};
