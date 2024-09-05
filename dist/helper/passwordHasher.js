"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordMatcher = exports.passwordHasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordHasher = async (password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return hashedPassword;
};
exports.passwordHasher = passwordHasher;
const passwordMatcher = async (password, hashedPassword) => {
    const result = await bcrypt_1.default.compare(password, hashedPassword);
    return result;
};
exports.passwordMatcher = passwordMatcher;
