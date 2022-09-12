"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSuperAdmin = exports.requireAdmin = exports.requireCashier = exports.requireNotAuthentication = exports.requireAuthentication = void 0;
const requireAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/auth/validate/fail/0');
};
exports.requireAuthentication = requireAuthentication;
const requireNotAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/auth/badreq');
    }
    return next();
};
exports.requireNotAuthentication = requireNotAuthentication;
const requireCashier = (req, res, next) => {
    if (req.user.role_id == 1) {
        return next();
    }
    return res.redirect('/auth/validate/fail/1');
};
exports.requireCashier = requireCashier;
const requireAdmin = (req, res, next) => {
    if (req.user.role_id == 2) {
        return next();
    }
    return res.redirect('/auth/validate/fail/2');
};
exports.requireAdmin = requireAdmin;
const requireSuperAdmin = (req, res, next) => {
    if (req.user.role_id == 3) {
        return next();
    }
    return res.redirect('/auth/validate/fail/3');
};
exports.requireSuperAdmin = requireSuperAdmin;
//# sourceMappingURL=auth.check.authenticate.middleware.js.map