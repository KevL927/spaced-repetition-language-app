import express from 'express';
const googleRoute = express.Router();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import User from '../models/user';
import questionFactory from '../set-question-order/question_factory';
import errorHandler from '../utils/error_handler';

let secrets;
    if (!process.env.CLIENT_ID) secrets = require('../config/client_secret');

googleRoute.use(passport.initialize());
googleRoute.use(passport.session());


// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID || secrets.google.client_id,
        clientSecret: process.env.CLIENT_SECRET || secrets.google.client_secret,
        callbackURL: process.env.CALL_BACK_URL || secrets.google.callbackURL,
        passReqToCallback: true
    },

    (request, accessToken, refreshToken, profile, done) => {
        User.findOne({
            userGoogleToken: profile.id
        }, (err, user) => {
            if (err) {
                errorHandler(user);
            }
            if (user) {
                user.access_token = accessToken;
                user.save(err => {
                    return done(err, user);
                });
            }
            else {
                let newUser = new User({
                    userGoogleToken: profile.id,
                    access_token: accessToken,
                    userName: profile.email.slice(0, profile.email.indexOf('@')),
                    questionOrder: questionFactory(),
                    results: 0
                });
                newUser.save((err, res) => {
                    if (err) return errorHandler(err, res);
                    return done(null, newUser);
                });
            }
        });
    }
));


googleRoute.get('/',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }));
googleRoute.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }),
    (req, res) => {
        return res.redirect('/?access_token=' + req.user.access_token + "&userId=" + req.user._id + "&userName=" + req.user.userName);
    }
);

//token auth setup
passport.use(
    new BearerStrategy(
        (token, done) => {
            User.findOne({
                    access_token: token
                },
                (err, user) => {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }

                    return done(null, user, {
                        scope: 'all'
                    })
                }
            );
        }
    )
);

export default googleRoute;