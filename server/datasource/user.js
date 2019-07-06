const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { normalizeUser } = require('./shared');

class UserAPI {
    constructor(User) {
        this.User = User
        this.secret = process.env.JWT_SECRET
    }

    initialize(config) {
        this.context = config.context;
    }

    async findOrCreateUser({ inputUsername, inputPassword, email, phone }) {
        const username = this.context && this.context.user ? this.context.user.name : inputUsername;
        if (!username, !inputPassword) return null;
        try {
            let user = await this.User.findOne({ username: inputUsername });
            if (!!user && !(await bcrypt.compare(inputPassword, user.hash))) return null;
            if (!user && !!email && !!phone) {
                const newUser = new this.User({
                    hash: await bcrypt.hash(inputPassword, 12),
                    username: inputUsername,
                    email,
                    phone,
                })
                user = await newUser.save()
            }
            return { 
                user: normalizeUser(user), 
                token: jwt.sign({ userId: user.id, email: user.email }, this.secret, { expiresIn: '1hr' }),
                expiresIn: 60
            }
        } catch (error) {
            console.log(error)
        }
    }

    static decodeToken(token) {
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        }catch(err) {
            return false;
        }
        if (!decodedToken) {
            return false;
        }
        return { userId: decodedToken.userId,  email: decodedToken.email};
    }
}

module.exports = UserAPI;

