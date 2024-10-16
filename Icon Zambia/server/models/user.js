import { Schema, model, set } from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import hashPassword from '../helper/passwordEncrypt.js';

const userSchema = Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [(email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email), 'Please fill a valid email address'],
    },
    password: {
        type: String,
    },
    picture: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: Array,
        default: [],
    },
});

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id;
    },
});

export const User = model("User", userSchema);
