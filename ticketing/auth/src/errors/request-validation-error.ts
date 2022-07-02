import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError{
  statusCode = 400;

  constructor(public errors: ValidationError[]){
    super('Invalid request parameters'); // message just for log in purpose, will not be sent out to user
    // Only because we are extending a built in class (extends Error)
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  // transfrom error to common response structure
  serializeErrors(){
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}