'use sctrict';

const MODES = require('../costants.js').constants.MODES;
const usersList = require('./users.js').usersList;

const perPage = 10;

const multiplayerScoreboard = Object.keys(Array(28)).map((key) => {
    return {
        index: key,
        nickname1: Object.keys(usersList)[key].nickname,
        nickname2: Object.keys(usersList)[key + 1].nickname,
        score: Math.floor(Math.random() * 4000)
    };
}).sort((a, b) => {
    return a.score > b.score;
});

const getScoreboardData = function({
    mode = MODES.SINGLEPLAYER,
    page = 0,
    myEmail = null
} = {}) {

    if (mode === MODES.SINGLEPLAYER) {
        const query = Object.values(usersList).sort(function(a, b) {
            return a.score > b.score;
        });
    
        let myIndex = -1;
        for (let [user, index] of query) {
            if (user.email === myEmail) {
                myIndex = index;
                break;
            } 
        }

        const another = query
        .slice((pageNumber - 1) * perPage, pageNumber * perPage)
        .map(function(user, index) {
            return {
                index,
                nickname: user.nickname,
                score: user.score
            };
        });

        return {
            another: another,
            me: myIndex > 0 ? {
                index: myIndex
            } : null
        };
    }

    if (mode === MODES.MULTIPLAYER) {
        another = multiplayerScoreboard.slice(
            (pageNumber - 1) * perPage, pageNumber * perPage
        );

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