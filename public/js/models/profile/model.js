'use strict';

import baseUrl from '../../components/globalData/baseUrl.js';
import apiUrls from '../../components/globalData/apiUrls.js';
import formFieldNames from '../../components/formsOptions/fieldNames.js';

import httpRequester from '../../components/http.js';
import utiles from '../../components/utiles.js';
import eventBus from '../../components/arcitectureElements/eventBus.js';

import profileEvents from './eventsNames.js';



class ProfileModel {
    constructor() {
        this._isAuthinticated = false;

        eventBus.on(profileEvents.LOGOUT(), this.logout.bind(this));
    }

// ---------------------------------------------------------------------------------
// responces
// ---------------------------------------------------------------------------------

    checkAuth() {
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
        httpRequester.doPost({
            url: apiUrls.post.LOGIN(),
            base: baseUrl.NEW,
            callback: (err, resp) => {
                if (err || !resp.successful) {
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
        httpRequester.doPost({
            url: apiUrls.post.REGISTRATION(),
            base: baseUrl.NEW,
            callback: (err, resp) => {
                if (err || !resp.successful) {
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
        httpRequester.doPost({
            url: apiUrls.post.LOGOUT(),
            base: baseUrl.NEW,
            callback: profileModel.checkAuth.bind(this),
            data: {}
        });
    }

// ---------------------------------------------------------------------------------
// getters
// ---------------------------------------------------------------------------------

    get data() {
        return true;
    }

    get email() {
        return this._data ? this._data.email : '';
    }

    get password() {
        return this._data ? '***...***' : '';
    }

    get nickname() {
        return this._data ? this._data.nickname : '';
    }

    get score() {
        return this._data ? this._data.score : '';
    }

    get games() {
        return this._data ? this._data.games_number : '';
    }

    get(fieldName) {
        switch (fieldName) {
            case formFieldNames.edit.email.EMAIL:
                return this.email;
            case formFieldNames.edit.nickname.NICKNAME:
                return this.nickname;
            case formFieldNames.edit.password.PASSWORD:
                return this.password;
            default:
                return '';
        }
    }

// ---------------------------------------------------------------------------------
// setters
// ---------------------------------------------------------------------------------

    changeEmail({ data = {}, callback = utiles.noop } = {}) {
        this._changeField({
            data: {
                [formFieldNames.edit.email.EMAIL]: 
                    data[formFieldNames.edit.email.EMAIL]
            },
            callback
        });    
    }

    changeNickname({ data = {}, callback = utiles.noop } = {}) {
        this._changeField({
            data: {
                [formFieldNames.edit.nickname.NICKNAME]: 
                    data[formFieldNames.edit.nickname.NICKNAME]
            },
            callback
        });  
    }

    changePassword({ data = {}, callback = utiles.noop } = {}) {
        this._changeField({
            data: {
                [formFieldNames.edit.password.PASSWORD]: 
                    data[formFieldNames.edit.password.PASSWORD],
                [formFieldNames.edit.password.NEW_PASSWORD]: 
                    data[formFieldNames.edit.password.NEW_PASSWORD]
            },
            callback
        });  
    }

    get authenticated() {
        return this._isAuthinticated;
    }

    _changeField({ data = {}, callback = utiles.noop } = {}) {
        httpRequester.doPost({
            url: apiUrls.post.EDIT_PROFILE(),
            base: baseUrl.NEW,
            data,
            callback(err, resp) {
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
        this._isAuthinticated = false;
        this._data = null;

        eventBus.call(profileEvents.DEAUTHORIZED());
    }

    _authenticate(resp) {
        this._data = resp;

        if (!this._isAuthinticated) {
            this._isAuthinticated = true;

            eventBus.call(profileEvents.AUTHORIZED(), this._data);
        }

        this._dataChanged();
    }

    _dataChanged() {
        eventBus.call(profileEvents.DATA_CHANGED(), this._data);
    }
}

const profileModel = new ProfileModel();

export default profileModel;