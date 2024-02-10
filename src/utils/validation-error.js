const { StatusCodes } = require("http-status-codes");
const AppError = require("./error-handler");

class ValidationError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let explaination = [];
    error.errors.forEach((err) => {
      explaination.push(err.message);
    });
    super
      (
      errorName,
      "Not able to validate the data sent to request",
      explaination,
      StatusCodes.UNPROCESSABLE_ENTITY
    )
  }
}

module.exports = ValidationError;
