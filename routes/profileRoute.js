const mongoose = require('mongoose')
const User = mongoose.model('users')


module.exports = (app) => {

    app.post('/api/introduce_user', async (req,res) => {
        const {nickName, job, country, city, sentence, hobbies} = req.body;
        if(req.user){
            const user =  await User.findById({ _id: req.user._id })
            user.nickname = nickName;
            user.job = job;
            user.country = country;
            user.city = city
            user.sentence = sentence;
            user.hobbies = hobbies;
            user.save()

            return res.status(200).send({message:"successfully introduced yourself", found:true})
        }else{
            return res.status(402).send({message:"falied to introduce yourself you must be loged in", found:false})
        }
    })
}
