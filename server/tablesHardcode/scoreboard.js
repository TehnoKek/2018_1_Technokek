'use sctrict';

const MODES = require('../costants.js').constants.MODES;
const usersList = require('./users.js').users;

const perPage = 10;

const multiplayerScoreboard = Array.apply(null, Array(28)).map(function (_, i) {return i;}).map((key) => {
    return {
        index: key + 1,
        nickname1: Object.values(usersList)[key].nickname,
        nickname2: Object.values(usersList)[key + 1].nickname,
        score: Math.floor(Math.random() * 4000)
    };
}).sort(function(a, b) {
    return b.score - a.score;
}).map(function(key, i) {
    key.index = i + 1;
    return key;
});

const getScoreboardData = function({
    mode = MODES.SINGLEPLAYER,
    page = 0,
    myEmail = null
} = {}) {

    if (mode === MODES.SINGLEPLAYER) {
        const query = Object.values(usersList).sort(function(a, b) {
            return b.score - a.score;
        });
    
        let myIndex = -1;

        for (let i = 0; i < query.length; i++) {
            console.log(i, query[i].email, myEmail);
            if (query[i].email === myEmail) {
                myIndex = i;
                break;
            } 
        }

        const another = query
        .slice((page - 1) * perPage, page * perPage)
        .map(function(user, index) {
            return {
                index: index + (page - 1) * perPage + 1,
                nickname: user.nickname,
                score: user.score
            };
        });

        return {
            another: another,
            me: myIndex >= 0 ? {
                index: myIndex + 1
            } : null
        };
    }

    if (mode === MODES.MULTIPLAYER) {
        another = multiplayerScoreboard.slice(
            (page - 1) * perPage, page * perPage
        );

        console.log(another, multiplayerScoreboard);

        return {
            another: another,
            me: null
        };
    }

    return {
        another: [],
        me: null
    };
};

exports.getScoreboardData = getScoreboardData;