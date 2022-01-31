const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cookie = require('cookie-session')
const mongoSanitize = require('express-mongo-sanitize');
const app = express()
const keys = require('./config/keys')
const cors = require('cors')


require('./model/User')
require('./model/Blog')



mongoose.Promise = global.Promise;
mongoose.connect(keys.mongURI,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

app.use(cors());
app.set('trust proxy', 1);

app.use(cookie({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))


app.use(passport.initialize())
app.use(passport.session())



app.use(mongoSanitize());



app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    }),
);

app.use(
    mongoSanitize({
      dryRun: true,
      onSanitize: ({ req, key }) => {
        console.warn(`[DryRun] This request[${key}] will be sanitized`, req);
      },
    }),
);







require('./services/passport')
// require('./services/cache')

require('./routes/authRoutes')(app)
require('./routes/profileRoute')(app)
require('./routes/storyRoutes')(app)

if(process.env.NODE_ENV === "production"){
  app.disable('x-powered-by')
  const path = require('path')

  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req,res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))

  })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('server is running')
})