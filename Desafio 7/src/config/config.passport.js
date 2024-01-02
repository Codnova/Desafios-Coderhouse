import passport from 'passport';
import local from 'passport-local'
import { usersModel } from '../dao/models/users.model.js';
import { createHash, validatePassword } from '../utils.js';

export function initializePassport() {

  passport.use('signup', new local.Strategy(
    {
      passReqToCallback: true, usernameField: 'email' // Tell passport to pass the req to our function and that the username is the email
    },

    async (req, password, done) => {
      try {
        let {name, age, email, role='user'} = req.body; // Get data from req body
        if(!email || !password || !age || !name) {
          //return res.redirect('/signup?error=Complete all the required fields');
          return done(null, false);
        } else {
          try {
            let findUser = await usersModel.findOne({email});
            if (findUser) {
              //return res.redirect(`/signup?error=Email ${email} already exists`)
              return done(null, false);
            } 
            password = await createHash(password); // Hash password to store it in the DB
            let newUser = await usersModel.create({name, age, email, password, role})
            console.log('New User: ', newUser)
            
            console.log('Req session on LOGIN: ', req.session);
            //return res.redirect(`/login?message=Account ${email} created`);
            return done(null, newUser)
          } catch (error) {
            console.log(error)
            //return res.redirect('/signup?error=Unexpected error in signup')
            return done(null, false);
          }
        }
      } catch (error) {
        return done(error, null);
      }
    }
  ))

  passport.use('login', new local.Strategy(
    {
      usernameField: 'email'
    },

    async (username, password, done)=> {
      //let {email} = req.body; // Load the name and password from the form body
      if(!username || !password) {
        return done(null, false);
        //return res.redirect('/login?error=Complete all the required fields');
      }
      try {
        let findUser = await usersModel.findOne({email:username}).lean();
        if (!findUser) { // User not found
          return done(null, false);
          //return res.redirect(`/login?error=User and password credentials not found`)
        } 
        if (!await validatePassword(findUser, password)) { // Checks if the login password matches the hash in the DB
          return done(null, false);
          //return res.redirect(`/login?error=User and password credentials not found`)
        }  
        return done(null, findUser)
        //return res.redirect('/products')
      } catch (error) {
        console.log(error)
        return done(error, false);
        //return res.redirect('/login?error=Unexpected error in login')
      }
    }
  ))


  passport.serializeUser((user, done)=>{
    return done(null, user._id);
  })

  passport.deserializeUser(async (id, done)=>{
    let user = await usersModel.findById(id);
    return done(null, user);
  })

}