// all the errors will extend this CustomError class to prevent typo
// this CustomError will make sure that all the errors contain "statusCode" and "serializeErrors()"
export abstract class CustomError extends Error{
  // formulate all the functions and parameters if you want to extend CustomError
  abstract statusCode: number;
  constructor(message: string){
    super(message);
    // Only because we are extending a built in class (extends Error)
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string, field?: string }[];
}