const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const oAuthLogin = require('../../middlewares/auth').oAuth;
const {
    login,
    register,
    oAuth,
    refresh,
    sendPasswordReset,
    passwordReset,
} = require('../../validations/auth.validation');

"use strict";

module.exports = {
    name: "auth"
}