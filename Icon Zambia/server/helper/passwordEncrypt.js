"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// passwordEncrypt(password:string):


import { pbkdf2Sync } from 'node:crypto';

const keyCode = process.env.SECRET_KEY || 'this8is9a0secret-key',
    loopCount = 10_000,
    charCount = 32,
    encType = 'sha512';


function hashPassword(password) {

    if (!keyCode) throw new Error('Secret key is not defined');

    const handeledPassword = pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex');
    return handeledPassword;
}

export default hashPassword

