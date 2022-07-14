import express, { Request, Response } from 'express';
// body: check body of the request, for checking email and password
import { body } from 'express-validator'; 
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';


const router = express.Router();

// route handler: we use the api to check the validation of email and password
router.post('/api/users/signup', [
  body('email') // check the email
    .isEmail()
    .withMessage("Email must be valid"),
  body('password') // check the password
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters")
  ], 
  validateRequest,
  async (req: Request, res: Response) => {
    // console.log('create a user...');
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if(existingUser){
      // console.log('Email in use');
      // return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save(); // save to the database

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!); // get jwt key from env variable (kubectl create secret generic ...)

    // Store it on session object
    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { router as signupRouter };