'use sctrict';

const loremIpsum = require('lorem-ipsum');

class User {
    constructor({
        id = 0, 
        nickname = loremIpsum({ count: 1 }), 
        email = '', 
        score = 0, 
        games_number = 0, 
        password = 'password', 
        avatar = null
    } = {}) {
        this._data = arguments[0];
    }

    get data() {
        return this._data;
    }
}

const users = {};
const USERS_COUNT = 30;

for (let i = 1; i < USERS_COUNT; i++) {
    users[`example${i}@mail.ru`] = new User({
        id: i,
        nickname: loremIpsum({ count: 1 }),
        email: `example${i}@mail.ru`,
        score: Math.floor(Math.random() * 2000),
        games_number: Math.floor(Math.random() * 50),
    }).data;
}

users['vv-ch@bk.ru'] = new User({
    id: USERS_COUNT,
    nickname: 'VitalyCherkov',
    email: 'vv-ch@bk.ru',
    score: 2500,
    games_number: 60,
    avatar: null,
    password: 'password'
}).data;

exports.UserModel = User;
exports.users = users;