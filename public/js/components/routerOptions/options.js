'use strict';

const routerMap = {
    '/': 'initScreenView',
    
    '/login': 'loginView',
    '/signup': 'signupView',
    '/logout': 'logoutView',

    '/user/me': 'profileView',
    '/user/edit': 'editProfileView',
    
    '/scorebpard': 'scoreboardSingleplayerView',
    '/scoreobard/singleplayer': 'scoreboardSingleplayerView',
    '/scoreboard/multiplayer': 'scoreboardMultiplayerView',
    
    '/info': 'rulesView',
    '/info/rules': 'rulesView',
    '/info/about': 'aboutView',
};

export default routerMap;