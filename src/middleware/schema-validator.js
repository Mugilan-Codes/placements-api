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
      // console.log(
      //   details.map((i) => {
      //     const pathName = i.path[0];
      //     const message = i.message;
      //     return { pathName, message };
      //   })
      // );
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
