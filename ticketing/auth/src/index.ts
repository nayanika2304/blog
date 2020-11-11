import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose';
import {currentUserRouter} from "./routes/current-user";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express()
app.set('trust proxy',true) // to make sure express is aware behind the proxy of ingress-nginx and let the traffic come in

app.use(json())
app.use(cookieSession({
    signed: false,
    secure:true
}))
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter)

app.all('*',async (req,res,next) =>{
    throw new NotFoundError()
})
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('connected to mongo db')
    }catch (err){
        console.error(err)
    }

}


app.listen(3000,() =>{
    console.log('listening on port 3000!!!')
})

start();
