const passport = require('passport')
const GoogleStrategy =  require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => { 
    User.findById(id)
        .then(user =>{
            done(null, user)
        }).catch((error) => {
           console.log(error);
        });
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'https://agile-harbor-09766.herokuapp.com/auth/google/callback',
    proxy:true
    
}, async (accessToken, refreshToken, profile, done) => {

   try {
    const user =  await User.findOne({ googleId: profile.id })
    if(user){
        //here deal with a user
        done(null, user)
    }
    else{
        const newUser = await new User({
            googleId: profile.id,
            name: profile.name.givenName + " " + profile.name.familyName,
            photo: profile.photos[0].value,
            password:"",
            email:profile.emails[0].value,
            neckname: "",
            job: "",
            country: "",
            city: "",
            sentence: "",
            hobbies: ""
            }).save()
         
        done(null, newUser)
    }
   } catch (error) {
       console.log(error)
   }

}))

passport.use(new LocalStrategy({
    usernameField: 'email',
    session:true,
    failWithError: true
    },
    
    async function(email, password, done) {
      await User.findOne({ email: email }, function (err, user) {
        if (err) { 
             return done(err); 
        }
        if (!user) {    
            return done(null,false,{
                message: "Invalid username and password."
            }) 
        }
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordCorrect) return done(null, false, { message: "Incorrect password" });
        return done(null, user);        
        
      });
    }
));


