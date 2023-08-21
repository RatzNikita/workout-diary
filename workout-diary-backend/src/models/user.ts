import mongoose, {Model} from 'mongoose'
import createHttpError from "http-errors";

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            minLength: 2,
            maxLength: 50,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 8,
            maxLength: 50,
            required: true,
            select: false,
        },
    },
    {
        statics: {
            findUserByCredentials(username, password) {
                return this.findOne({username}).select('+password')
                    .then((user) => {
                        if (!user) {
                            return Promise.reject(createHttpError(400, 'Неправильные почта или пароль'));
                        }
                        return bcrypt.compare(password, user.password)
                            .then((matched: boolean) => {
                                if (!matched) {
                                    return Promise.reject(createHttpError(400, 'Неправильные почта или пароль'));
                                }
                                return user;
                            });
                    });
            }}
    })

export default mongoose.model('user', userSchema)