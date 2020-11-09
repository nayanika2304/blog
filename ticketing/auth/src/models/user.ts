import mongoose from 'mongoose';

// An interface that describes the properties that are required to create a new user
interface UserAttrs{
    email: string,
    password: string
}

//An  interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs:UserAttrs): UserDoc;
}

// An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});




//custom way to add a function to the schema in mongoose
userSchema.statics.build = (attrs: UserAttrs) =>{
    return new User(attrs)
}
const User = mongoose.model<UserDoc,UserModel>('User',userSchema)


export {User}
