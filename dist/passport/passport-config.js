"use strict";
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
function initialize(passport, getModetator, getCashier, getUserById) {
    const authenticateUser = async (req, username, password, done)=>{
        let userProfile = null;
        if (req.body.loginType == 1) {
            if (req.body.serialNumber == null) {
                return done(null, false, "CashierPass: Bad Request!");
            }
            userProfile = await getCashier(username, req.body.serialNumber);
        } else if (req.body.loginType == 2) {
            userProfile = await getModetator(username);
        }
        if (userProfile == null) {
            console.log("no user");
            return done(null, false, {
                message: 'Invalid User!'
            });
        }
        const passwordFromDB = userProfile.password;
        try {
            if (userProfile.role_id == 1) {
                if (await password == userProfile.password_mobile_pos) {
                    console.log(`${Date.now()} info: =================================`);
                    console.log(`${Date.now()} info: ===== 🎖️  Authenticated 🎖️ ======`);
                    console.log(`${Date.now()} info: >> Cashier: ${username}`);
                    console.log(`${Date.now()} info: =================================`);
                    return done(null, userProfile);
                } else {
                    console.log('cashier password fail');
                    return done(null, false, "CashierPass: Incorrect Password!");
                }
            } else {
                if (await bcrypt.compare(password, passwordFromDB)) {
                    console.log(`${Date.now()} info: =================================`);
                    console.log(`${Date.now()} info: ===== 🎖️  Authenticated 🎖️ ======`);
                    console.log(`${Date.now()} info: >> Moderator: ${username}`);
                    console.log(`${Date.now()} info: =================================`);
                    return done(null, userProfile);
                } else {
                    console.log('password fail');
                    return done(null, false, "ModeratorPass: Incorrect Password!");
                }
            }
        } catch (error) {
            console.log("ERROR yeeeeeeeeeeeeeeeeeeeeeee");
            console.log(error);
            return done(error);
        }
    };
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, authenticateUser));
    passport.serializeUser((user, done)=>done(null, user.id));
    passport.deserializeUser(async (id, done)=>{
        return done(null, await getUserById(id));
    });
}
module.exports = initialize;

//# sourceMappingURL=passport-config.js.map