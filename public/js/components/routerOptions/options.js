'use strict';

import viewNames from "../../modules/viewNames.js";

const routerMap = [
    {
        path: '/',
        name: viewNames.INITIAL_SCREEN
    },
    {
        path: '/lobby',
        name: viewNames.LOBBY_SCREEN
    },
    {
        path: '/game',
        name: viewNames.GAME_SCREEN
    },
    
    // '/login': 'loginView',
    // '/signup': 'signupView',
    // '/logout': 'logoutView',

    // '/user/me': 'profileView',
    // '/user/edit': 'editProfileView',
    
    // '/scorebpard': 'scoreboardSingleplayerView',
    // '/scoreobard/singleplayer': 'scoreboardSingleplayerView',
    // '/scoreboard/multiplayer': 'scoreboardMultiplayerView',
    
    // '/info': 'rulesView',
    // '/info/rules': 'rulesView',
    // '/info/about': 'aboutView',
];

export default routerMap;