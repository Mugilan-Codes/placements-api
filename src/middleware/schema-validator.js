import { logger } from '../utils';

const validator = (schema, property = 'body') => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    });

    const isValid = error == null;

    if (isValid) {
      logger.debug(`req[${property}] value =`, value);
      next();
    } else {
      const { details } = error;
      const message = await details.map((i) => {
        const pathName = i.path[0];
        const message = i.message;
        return { pathName, message };
      });

      res.status(422).json({ error: message });
    }
  };
};

export default validator;
