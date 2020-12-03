import Joi from 'joi';

export const studentSchema = {
  create: Joi.object().keys({}),
};

export class Student {
  constructor() {}

  addStudent() {}
}
