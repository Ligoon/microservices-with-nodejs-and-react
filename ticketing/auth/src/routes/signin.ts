import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@ligoon/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
  // we use body as a middleware to check if email and password is valid
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],  
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // if email does not exist, throw error
    const existingUser = await User.findOne({ email });
    if(!existingUser){
      throw new BadRequestError('Invalid Credentials');
    }
    // compare two passwords
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch){
      throw new BadRequestError('Invalid Credentials');
    }
    // if user is verified, then send a JWT
    // Generate JWT
    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_KEY!); // get jwt key from env variable (kubectl create secret generic ...)

    // Store it on session object
    req.session = {
      jwt: userJwt
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };