import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global{
  function signin(): string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'; // to prevent error when testing
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  // connect to inmemoryserver
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections(); // get all the collections that exist
  // loop over and delete all data
  for(let collection of collections){
    await collection.deleteMany({});
  }
});

// the hook that will run after all the tests completed
afterAll(async () => {
  if(mongo){
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(), // dynamic generate an id
    email: 'test@gmail.com'
  }
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object. { jwt: my_jwt }
  const session = { jwt: token };
  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string that the cookie with the encoded data (session=)
  return [`session=${base64}`]; 
};