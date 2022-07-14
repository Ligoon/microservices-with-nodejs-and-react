import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload{
  id: string;
  email: string;
}
// modify exsiting 'Request' interface
declare global{
  namespace Express{
    interface Request{
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // if it is not set, or if the JWT is invalid, return early
  if(!req.session?.jwt){  // !req.session || !req.session.jwt
    return next();
  }
  try{
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
     // if yes, and JWT is valid, send back the info stored inside the JWT(the payload)
    req.currentUser = payload;
  }
  catch(err){}
  next();
};