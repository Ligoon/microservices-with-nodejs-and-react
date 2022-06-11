import express, { Request, Response } from 'express';
// body: check body of the request, for checking email and password
import { body, validationResult } from 'express-validator'; 
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';


const router = express.Router();

// we use the api to check the validation of email and password
router.post('/api/users/signup', [
  body('email') // check the email
    .isEmail()
    .withMessage("Email must be valid"),
  body('password') // check the password
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters")
], (req: Request, res: Response) => {
  // validationResult: pull the validation information out from the cheking result
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // pick up by middleware error-handler, Error(message property)
    throw new RequestValidationError(errors.array());
  }
  const { email, password } = req.body;
  console.log('create a user...');
  throw new DatabaseConnectionError();

  res.send({});
});

export { router as signupRouter };