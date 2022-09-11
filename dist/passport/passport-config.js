"use strict";
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
function initialize(passport, getUser, getUserById) {
    const authenticateUser = async (username, password, done)=>{
        const userProfile = await getUser(username);
        if (userProfile == null) {
            console.log("no user");
            return done(null, false, {
                message: 'Invalid User!'
            });
        }
        const usernameFromDB = userProfile.username;
        const passwordFromDB = userProfile.password;
        try {
            if (await bcrypt.compare(password, passwordFromDB)) {
                console.log(`${Date.now()} info: =================================`);
                console.log(`${Date.now()} info: ===== 🎖️  Authenticated 🎖️ ======`);
                console.log(`${Date.now()} info: >> ${username}`);
                console.log(`${Date.now()} info: =================================`);
                return done(null, userProfile);
            } else {
                console.log('password fail');
                return done(null, false, "Incorrect Password!");
            }
        } catch (error) {
            console.log("ERROR yeeeeeeeeeeeeeeeeeeeeeee");
            console.log(error);
            return done(error);
        }
    };
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done)=>done(null, user.id));
    passport.deserializeUser(async (id, done)=>{
        return done(null, await getUserById(id));
    });
}
module.exports = initialize;

//# sourceMappingURL=passport-config.js.map