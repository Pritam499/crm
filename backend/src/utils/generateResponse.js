// const generateResponse = (success, data={}, message, metadata={}, options = {}) => {
//     return {
//       success,
//       data,
//       message,
//       metadata,
//       ...options,
//     };
//   };
//   export default generateResponse;

const generateResponse = (success, data, message, error = null, validationErrors = null) => {
  return {
    success,
    data,
    message,
    ...(error && { error }),
    ...(validationErrors && { validationErrors })
  };
};

export default generateResponse;