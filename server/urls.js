'use strict';

class Urls {
	constructor(base = '') {
		this._get = {
			ME: `${base}/user/me`,
			USER: `${base}/user/:id`,
			SCOREBOARD: `${base}/scoreboard/:mode/:page`,
			HISTORY: `${base}/history/:mode/:page`,
            ABOUT: `${base}/about`,
            RULES: `${base}/rules`
            //TODO: AVATAR
		};
		this._post = {
			LOGIN: `${base}/login`,
			REGISTRATION: `${base}/signup`,
			AVATAR: `${base}/upload/avatar`,
			USER_EDIT: `${base}/user/edit`,
			LOGOUT: `${base}/logout`
		};
	}

	get get() {
		return this._get;
	}

	get post() {
		return this._post;
	}
}

exports.Urls = Urls;

// export default Urls;