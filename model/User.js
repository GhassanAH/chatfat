const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    googleId: String,
    name: String,
    photo: String,
    password: String,
    email:String,
    nickname: String,
    job: String,
    country: String,
    city: String,
    sentence: String,
    hobbies: String

})

mongoose.model('users', userSchema)