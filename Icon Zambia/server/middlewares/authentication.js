"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// app.use(authentication):

import jwt from 'jsonwebtoken';

export default async function (req, res, next) {

    const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    if (tokenKey) {

        jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => {
            if (err) return res.status(403).json({ error: true, message: 'Token is not valid' })
            req.user = userData
        })
    }
    next()
}