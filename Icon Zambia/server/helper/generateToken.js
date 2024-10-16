import jwt from 'jsonwebtoken';

export default function (user, isRefresh = false) {

    const { password, ...accessData } = user._doc
    const refreshData = { _id: accessData._id, email: accessData.email };

    return {
        access: jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '15m' }),
        refresh: isRefresh ? null : jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '1d' })
    }
}