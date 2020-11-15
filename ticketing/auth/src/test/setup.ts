import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from "../app";
import request from 'supertest';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
        }
    }
}
let mongo : any

// a hook that runs before all test
beforeAll(async() =>{
    process.env.JWT_KEY = 'asdf';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

//runs before each of the test
beforeEach( async() =>{
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
})

//runs after all the tests
afterAll(async () =>{
    await mongo.stop();
    await mongoose.connection.close()
})

global.signin = async() =>{
    const email = 'test@test.com'
    const password = 'password'
    const response  = await request(app)
        .post('/api/users/signup')
        .send({
            email,password
        })
        .expect(201)
    const cookie = response.get('Set-Cookie');
    return cookie
}
