const validator = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: true,
    });

    const isValid = error == null;

    if (isValid) {
      console.log({ value });
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message);

      res.status(422).json({ error: message });
    }
  };
};

export default validator;
