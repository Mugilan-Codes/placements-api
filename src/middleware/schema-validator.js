const validator = (schema, property = 'body') => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    });

    const isValid = error == null;

    if (isValid) {
      // console.log({ value });
      next();
    } else {
      const { details } = error;
      const message = await details.map((i) => i.message);

      res.status(422).json({ error: message });
    }
  };
};

export default validator;
