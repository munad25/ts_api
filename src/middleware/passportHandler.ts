import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'

require('dotenv').config()
const User = require('../db/models').users 
const passportFacebook = require('passport-facebook')

const FacebookStrategy = passportFacebook.Strategy
const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt


passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}, async (req: any, payload: any, done: any) => {
    try {
        // Cari user dengan id yan tersimpan pada jwt
        const user = await User.findByPk(payload.sub);

        // jika user ditemukan update user
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ["emails", "name", 'birthday']
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        const { email, first_name, last_name, birthday } = profile._json;
       User.findOrCreate({
            where: { email_address: email },
            defaults: {
                first_name,
                last_name,
                password: null,
                ic_number: null,
                birth_date: new Date(birthday),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        cb(null, profile);
    }
))