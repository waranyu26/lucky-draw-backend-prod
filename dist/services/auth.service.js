"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: this.users.length + 1 }, userData), { password: hashedPassword });
        return createUserData;
    }
    async login(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = this.users.find(user => user.email === userData.email);
        if (!findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
        const isPasswordMatching = await (0, bcrypt_1.compare)(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = this.users.find(user => user.email === userData.email && user.password === userData.password);
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secretKey = _config_1.SECRET_KEY;
        const expiresIn = 60 * 60;
        return { expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map