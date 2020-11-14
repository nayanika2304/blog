import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from "../app";

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
