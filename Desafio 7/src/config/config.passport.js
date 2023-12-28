import passport from 'passport';
import local from 'passport-local'
import { usersModel } from '../dao/models/users.model.js';
import { createHash } from '../utils.js';

export function initializePassport() {

  passport.use('signup', new local.Strategy(
    {
      passReqToCallback: true, usernameField: 'email'
    },

    async (req, username, password, done) =>{

    }
  ))

}