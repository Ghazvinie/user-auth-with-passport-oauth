const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/userSchema');
// const bcrypt = require('bcrypt');


function passportSetup(passport) {

    // // Local Strategy
    // passport.use(new LocalStrategy({ usernameField: 'email' },
    //     async function (email, password, done) {
    //         try {
    //             // Checks if user already exists in database
    //             const user = await UserModel.findOne({ email });
    //             if (user) {
    //                 // Checks passwords match
    //                 const userValid = await bcrypt.compare(password, user.password);
    //                 if (userValid) {
    //                     return done(null, user);
    //                 } else {
    //                     // Password invalid
    //                     return done(false, null, { message: 'Invalid password' });
    //                 }
    //             } else {
    //                 // User is not registered
    //                 return done(false, null, { message: 'Email not registered' });
    //             }
    //         } catch (err) {
    //             return done(err);
    //         }
    //     }
    // ));

    // Google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Checks if user already exists in database
                const userExists = await UserModel.findOne({ googleID: profile.id });
                if (userExists) {
                    return done(null, userExists);
                } else {
                    // Creates and then adds new user to database
                    const user = new UserModel({
                        email: profile._json.email,
                        googleID: profile.id
                    });
                    const newUser = await user.save({ validateBeforeSave: false });
                    return done(null, newUser);
                }
            } catch (err) {
               return done(null, err);
            }
        }
    ));

    // Serialize user 
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Find user and deserialize 
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'));
            }
        } catch (err) {
            done(err);
        }
    });
}

module.exports = passportSetup;