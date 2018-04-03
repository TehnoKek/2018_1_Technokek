'use strict';

import baseUrl from '../../components/globalData/baseUrl.js';
import apiUrls from '../../components/globalData/apiUrls.js';

import globalValues from '../../components/gloabalData.js';
import httpRequester from '../../components/http.js';
import utiles from '../../components/utiles.js';
import eventBus from '../../components/arcitectureElements/eventBus.js';
import eventsTypes from '../../components/eventsTypes.js';

import profileEvents from './eventsNames.js';
import profileUrls from './urls.js';

import errors from '../../components/globalData/errors.js';

class ProfileModel {
    constructor() {
        this._isAuthinticated = false;
    }

// ---------------------------------------------------------------------------------
// responces
// ---------------------------------------------------------------------------------

    checkAuth() {
        console.log('checkAuth');

        httpRequester.doGet({
            base: baseUrl.NEW,
            url: apiUrls.get.ME(),
            callback: (err, resp) => {
                if (err || !resp.successful) {
                    this._deauthenticate();
                }
                else {
                    this._authenticate(resp.message);
                }
            } 
        });
    }

    auth({ data = {}, callback = utiles.noop } = {}) {
        console.log('auth', data);

        httpRequester.doPost({
            url: apiUrls.post.LOGIN(),
            base: baseUrl.NEW,
            callback: (err, resp) => {
                if (err || !resp.successful) {
                    console.log(resp);
                    callback({
                        successful: false,
                        errors: resp.message
                    });
                }
                else {
                    callback({ successful: true });
                    this._authenticate(resp.message);
                }
            },
            data
        });
    }

    signup({ data = {}, callback = utiles.noop } = {}) {
        console.log('signup', data);

        httpRequester.doPost({
            url: apiUrls.post.REGISTRATION(),
            base: baseUrl.NEW,
            callback: (err, resp) => {
                console.log(err, resp);

                if (err || !resp.successful) {
                    console.log(resp);
                    callback({
                        successful: false,
                        errors: resp.message
                    });
                }
                else {
                    callback({ successful: true });
                    this._authenticate(resp.message);
                }
            },
            data: {
                email: data.email,
                password: data.password,
                nickname: data.nickname
            }
        });
    }

    logout() {
        console.log('logut');

        httpRequester.doPost({
            url: apiUrls.post.LOGOUT(),
            base: baseUrl.NEW,
            callback: (err, resp) => {
                console.log(err, resp);
            },
            data: {}
        });

        this.checkAuth();
    }

// ---------------------------------------------------------------------------------
// getters
// ---------------------------------------------------------------------------------

    get data() {
        console.log('[get] data');
        return true;
    }

    get email() {
        console.log('[get] emial');
        return this._data.email;
    }

    get nickname() {
        console.log('[get] nickname');
        return this._data.nickname;
    }

    get score() {
        console.log('[get] score');
        return this._data.score;
    }

    get games() {
        console.log('[get] games', this._data);
        return this._data.games_number;
    }

// ---------------------------------------------------------------------------------
// setters
// ---------------------------------------------------------------------------------

    changeEmail({ data = '', callback = utiles.noop } = {}) {
        console.log('[set] email');

        this._changeField({
            data: {
                'email': data.email
            },
            callback
        });    
    }

    changeNickname({ data = '', callback = utiles.noop } = {}) {
        console.log('[set] nickname');

        this._changeField({
            data: {
                'nickname': data.nickname
            },
            callback
        });  
    }

    changePassword({ data = {}, callback = utiles.noop } = {}) {
        console.log('[set] password');

        if (data['new_password'] !== data['new_password_repeat']) {
            callback({
                global: [],
                fields: {
                    'new_password_repeat': [ errors.forms.PASSWORDS_DO_NOT_MATCH ]
                }
            });
        }
        else {
            this._changeField({
                data: {
                    'password': data['password'],
                    'new_password': data['new_password'],
                },
                callback
            });  
        }
    }

    get history() {
        console.log('[get] history');
        return true;
    }

    get authenticated() {
        return this._isAuthinticated;
    }

    _changeField({ data = {}, callback = utiles.noop } = {}) {
        console.log('field data to send', data);

        httpRequester.doPost({
            url: apiUrls.post.EDIT_PROFILE(),
            base: baseUrl.NEW,
            data,
            callback(err, resp) {
                console.log(err, resp);
                if (err || !resp.successful) {
                    callback({
                        successful: false,
                        errors: resp.message
                    });
                }
                else {
                    if (resp.message) {
                        callback({ successful: true });
                        profileModel._authenticate(resp.message);
                    }
                }
            }
        });
    }

// ---------------------------------------------------------------------------------
// private signals
// ---------------------------------------------------------------------------------

    _deauthenticate() {
        console.log('deauthenticate');
        this._isAuthinticated = false;
        this._data = null;

        eventBus.call(profileEvents.DEAUTHORIZED());
    }

    _authenticate(resp) {
        console.log('authenticate', resp);
        this._data = resp;

        if (!this._isAuthinticated) {
            this._isAuthinticated = true;

            eventBus.call(profileEvents.AUTHORIZED());
        }

        this._dataChanged();
    }

    _dataChanged() {
        console.log('data changed');

        eventBus.call(profileEvents.DATA_CHANGED());
    }
}

const profileModel = new ProfileModel();

export default profileModel;