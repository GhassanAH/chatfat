const passport = require('passport')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const User = mongoose.model('users')
const sendEmail = require("../services/sendGrid")





module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    }))

    app.get('/auth/google/callback', 
    passport.authenticate('google'), 
    (req,res) => {
      if(process.env.NODE_ENV === "production"){
        res.redirect('/home')
      }else{
        res.redirect('http://localhost:3000/home')
      }
        
        
    }
    )

    app.post('/api/login',(req,res,next) => {
        passport.authenticate('local', (err, user, info) => {

            if(err){
                return res.status(401).send(err);
           }else if(!user){
                return res.status(401).send(info);
           }else{
                return req.login(user, (err) => {
                    if(err){
                        res.status(500).send(err);
                        return
                    }
                    return res.send(user)
                   
                })
                
           }
        })(req, res, next)
    })
    

    app.post('/api/signup', async (req,res) => {
        try {
            const {fname, sname, email, picture, password} = req.body
          
            const userExists =  await User.findOne({ email: email })
            if(userExists){
                return res.status(200).send({message:"you are already signed up"})
            }
            const user = await new User({
                googleId: "",
                name: fname + " " + sname,
                photo: picture,
                password:password,
                email:email
                }).save()
            

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            user.save()
            return res.status(200).send({message:""})

        } catch (error) {
            console.log(error)
        }
        
    })

    app.post('/api/check_email', async (req,res) => {
        const {email} = req.body
        const userExists =  await User.findOne({ email: email })
        if(userExists){
            return res.status(200).send({found:true})
        }else{
            return res.status(200).send({found:false})
        }
    })
    

    app.post('/api/update', async (req,res) => {
        const {fname, sname, picture, email} = req.body
        if(req.user){

            const useru =  await User.findById({ _id: req.user._id })
            if(fname !== '' && sname !== ''){
                useru.name = fname + ' ' + sname
            }
            if(picture !== ''){
                useru.photo = picture
            }
            if(email !== ''){
                useru.email = email
            }
            useru.save()
            return res.status(200).send({message:"successfully updated"})
        }else{
            return res.status(402).send({message:"falied to update you must be loged in"})
        }

    })

    app.post('/api/update_password', async (req,res) => {
        try {
            const {email, password} = req.body;
            const user =  await User.findOne({ email: email })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save()
            return res.status(200).send({message:"successful reset"})
        } catch (error) {
            return res.status(400).send({message:error.message})
        }

    })

    app.post('/api/rest_password', async (req,res) => {
        const {email} = req.body
        try {
            const randNum = Math.floor(Math.random() * 13182125114)
            sendEmail(email,randNum)
            const salt = await bcrypt.genSalt(10);
            const userpass = await bcrypt.hash(randNum.toString(), salt);
            return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox', data:userpass, found:null});
        } catch (error) {
            console.log(error.message)  
        }
        

    })

    app.get('/api/profile', (req,res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req,res) => {
        req.logout()
        res.redirect('/home')
    })
  

}