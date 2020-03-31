export const getSchemaValidator = schema => {
  return async values => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err) {
      return err.inner.reduce(
        (formError, innerError) => ({
          ...formError,
          [innerError.path]: innerError.message
        }),
        {}
      );
    }
  };
};
