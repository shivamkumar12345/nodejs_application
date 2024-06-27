const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser')
const ejsMateEngine = require("ejs-mate")
const connectFlash = require('connect-flash')
const session = require('express-session')
const path = require("path")
const productRouter= require('./routers/product')
const reviewRouter = require('./routers/review')
const authRouter = require('./routers/auth')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const db = require('./db')

app.engine('ejs',ejsMateEngine)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(connectFlash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

app.use(passport.initialize()); 
app.use(passport.session());
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  
  res.locals.error = req.flash('error');
  next();
});

app.use(authRouter)
app.use(productRouter)
app.use(reviewRouter)


app.listen(process.env.PORT || 8080,()=>{
    console.log("app started at 8080 succesfully");
})