import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; 
// body: check body of the request, for checking email and password
// validationResult: pull the validation information out from the cheking result

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
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).send(errors.array()); // errors.array() turn object to json
  }
  const { email, password } = req.body;
  console.log('create a user...');
  res.send({});
});

export { router as signupRouter };