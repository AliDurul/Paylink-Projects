import { connect } from 'mongoose';

export default async function dbConnection() {
    connect(process.env.MONGO_URI)
        .then(() => console.log('* Database connected *'))
        .catch(err => console.log('! Database connection failed !', err));
}


