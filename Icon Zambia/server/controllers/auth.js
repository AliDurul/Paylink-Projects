
import CustomError from '../helper/customError.js';
import generateToken from '../helper/generateToken.js';
import hashPassword from '../helper/passwordEncrypt.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';


export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) throw new CustomError('Please fill in all fields.', 400);

    const user = await User.findOne({ email });

    if (!user) throw new CustomError('User does not exist.', 404);


    if (user && user.password !== hashPassword(password)) throw new CustomError('Invalid credentials.', 400);

    res.status(200).send(generateToken(user));

}
export const logout = async (req, res) => {

    res.status(200).send({
        error: false,
        msg: "Logged out successfully"
    })

}
export const register = async (req, res) => {

    const { name, email } = req.body;
    let user;

    if (req.body.sub) {
        const { sub, name, email, picture, } = req.body;
        user = await User.findById({ _id: sub });
        if (user) {
            res.status(200).send(generateToken(user))
        }

        const newUser = new User({
            _id: sub,
            picture,
            email,
            name,
            password: '',
        });
        await newUser.save();

        res.status(200).send(generateToken(newUser))

    } else {
        if (!email || !req.body?.password || !name) throw new CustomError('Please fill in all fields.', 400);
        if (req.body?.password.length < 6) throw new CustomError('Password must be at least 6 characters.', 400);
        user = await User.findOne({ email });
        if (user) throw new CustomError('User already exists with same Email', 400);
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const picture = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        req.body.password = hashPassword(req.body.password);
        req.body.picture = picture;
        user = await User.create(req.body);
    }




    res.status(200).send(generateToken(user))


}

export const refresh = async (req, res) => {

    const { refresh } = req.body;

    if (!refresh) throw new CustomError('Please provide a refresh token.', 400);

    jwt.verify(refresh, process.env.REFRESH_KEY, async (err, data) => {

        if (err) throw new CustomError('Invalid refresh token.', 400);

        const { _id, email } = data;

        if (!_id || !email) throw new CustomError('Invalid refresh token.', 400);

        const user = await User.findById(_id);

        if (!user) throw new CustomError('User does not exist.', 404);

        res.status(200).send(generateToken(user, true));
    })
}