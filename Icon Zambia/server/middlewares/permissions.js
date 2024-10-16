import CustomError from "../helper/customError.js"

export const isLogin = (req, res, next) => {
    if (!req.user) throw new CustomError("AuthenticationError: You must be logged in to access this resource.", 403)
    next()
}