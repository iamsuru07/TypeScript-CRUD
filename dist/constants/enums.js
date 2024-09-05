"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponseEnum = exports.StatusResponseEnum = void 0;
var StatusResponseEnum;
(function (StatusResponseEnum) {
    StatusResponseEnum["FAILED"] = "FAILED";
    StatusResponseEnum["SUCCESS"] = "SUCCESS";
})(StatusResponseEnum || (exports.StatusResponseEnum = StatusResponseEnum = {}));
var MessageResponseEnum;
(function (MessageResponseEnum) {
    MessageResponseEnum["USERNAME_IS_REQUIRED"] = "USERNAME IS REQUIRED";
    MessageResponseEnum["PASSWORD_IS_REQUIRED"] = "PASSWORD IS REQUIRED";
    MessageResponseEnum["USERNAME_ALREADY_EXISTS"] = "USERNAME ALREADY TAKEN";
    MessageResponseEnum["USER_CREATED_SUCCESSFULLY"] = "USER CREATED SUCCESSFULLY";
    MessageResponseEnum["INTERNAL_SERVER_ERROR"] = "INTERNAL SERVER ERROR";
    MessageResponseEnum["USER_DOES_NOT_EXISTS"] = "USER DOES NOT EXISTS";
    MessageResponseEnum["INAVLID_CREDENTIALS"] = "INVALID CREDENTIALS";
    MessageResponseEnum["AUTHENTICATION_SUCCESSFUL"] = "AUTHENTICATION SUCCESSFUL";
    MessageResponseEnum["NEW_PASSWORD_IS_REQUIRED"] = "NEW PASSWORD IS REQUIRED";
    MessageResponseEnum["PASSWORD_CANNOT_BE_SAME"] = "PASSWORD CAN NOT BE SAME";
    MessageResponseEnum["PASSWORD_NOT_UPDATED"] = "PASSWORD NOT UPDATED";
    MessageResponseEnum["PASSWORD_UPDATED_SUCCESSFULLY"] = "PASSWORD UPDATED SUCCESSFULLY";
})(MessageResponseEnum || (exports.MessageResponseEnum = MessageResponseEnum = {}));
