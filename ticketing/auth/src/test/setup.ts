import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global{
  function signin(): Promise<string>;
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

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201);

  const cookie = response.get('set-Cookie');
  return cookie;
};