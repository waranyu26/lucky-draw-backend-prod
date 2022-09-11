"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    requireAuthentication: ()=>requireAuthentication,
    requireNotAuthentication: ()=>requireNotAuthentication,
    requireCashier: ()=>requireCashier,
    requireAdmin: ()=>requireAdmin,
    requireSuperAdmin: ()=>requireSuperAdmin
});
const requireAuthentication = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/auth/validate/fail/0');
};
const requireNotAuthentication = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/auth/badreq');
    }
    return next();
};
const requireCashier = (req, res, next)=>{
    if (req.user.role_id == 1) {
        return next();
    }
    return res.redirect('/auth/validate/fail/1');
};
const requireAdmin = (req, res, next)=>{
    if (req.user.role_id == 2) {
        return next();
    }
    return res.redirect('/auth/validate/fail/2');
};
const requireSuperAdmin = (req, res, next)=>{
    if (req.user.role_id == 3) {
        return next();
    }
    return res.redirect('/auth/validate/fail/3');
};

//# sourceMappingURL=auth.check.authenticate.middleware.js.map