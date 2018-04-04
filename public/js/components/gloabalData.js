'use strict';

import Rules from '../modules/downscreen/downsections/rules/rules.js';
import Profile from '../modules/downscreen/downsections/profile/profile.js';
import Scoreboard from '../modules/downscreen/downsections/scoreboard/scoreboard.js';


class GlobalValues {
    constructor() {
        this._apiUrls = {
            GET: {
                USER: '/user',
                HISTORY: ({mode, page}) => `/history/${mode}/page/${page}`,
                SCOREBOARD: ({mode, page}) => `/scoreboard/${mode}/page/${page}`,
                ABOUT: '/about',
                RULES: '/rules',
                ME: '/me'
            },
        
            POST: {
                AUTH: '/login',
                SIGNUP: '/signup',
                LOGOUT: '/logout',
                EDIT_USER: '/edit'
            }
        };
    }

    get apiUrls() {
        return this._apiUrls;
    }

    get tablesOptions() {
        return {
            scoreboard: {
                singleplayer: [
                    {
                        title: '#',
                        name: 'index',
                        template: '60px'
                    },
                    {
                        title: 'Nickname',
                        name: 'nickname',
                        template: 'auto'
                    },
                    {
                        title: 'Score',
                        name: 'score',
                        template: '110px'
                    }
                ],
                multiplayer: [
                    {
                        title: '#',
                        name: 'index',
                        template: '60px'
                    },
                    {
                        title: 'Nickname',
                        name: 'nickname1',
                        template: 'minmax(30%, 40%)'
                    },
                    {
                        title: 'Nickname',
                        name: 'nickname2',
                        template: 'minmax(30%, 40%)'
                    },
                    {
                        title: 'Score',
                        name: 'score',
                        template: 'minmax(90px, auto)'
                    }
                ]
            },

            gameHistory: {
                singleplayer: [
                    {
                        title: '#',
                        name: 'index',
                        template: '60px'
                    },
                    {
                        title: 'Date',
                        name: 'date',
                        template: 'auto'
                    },
                    {
                        title: 'Score',
                        name: 'score',
                        template: '120px'
                    }
                ],
                multiplayer: [
                    {
                        title: '#',
                        name: 'index',
                        template: '60px'
                    },
                    {
                        title: 'Date',
                        name: 'date',
                        template: '120px'
                    },
                    {  
                        title: 'Partner',
                        name: 'partner',
                        template: 'auto'
                    },
                    {
                        title: 'Score',
                        name: 'score',
                        template: '120px'
                    }
                ]
            }
        };
    }
}

const globalValues = new GlobalValues();

export default globalValues;