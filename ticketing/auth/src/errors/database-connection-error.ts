import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError{
  statusCode = 500;
  reason = 'Error connecting to database';
  
  constructor(){
    super('Error connecting to database'); // message just for log in purpose, will not be sent out to user
    // Only because we are extending a built in class (extends Error)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  // transfrom error to common response structure
  serializeErrors(){
    return [{ message: this.reason }];
  }
}