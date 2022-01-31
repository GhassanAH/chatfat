const mongoose = require('mongoose')
const {Schema} = mongoose

const blogSchema = new Schema({
    title: String,
    content: String,
    imageUrl: String,
    videoUrl: String,
    createdAt: { type: Date, default: Date.now },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }

})

mongoose.model('blogs', blogSchema)