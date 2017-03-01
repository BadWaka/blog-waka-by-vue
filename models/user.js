/**
 * Created by BadWaka on 2017/3/1.
 */
let mongoose = require('mongoose');
let UserSchema = require('../schemas/user');

const User = mongoose.model('User', UserSchema);

module.exports = User;
