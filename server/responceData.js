'use strict';

class ResponceData {
	constructor () {
		this._successful = true;
		this._message = {
			global: [],
			fields: {}
		};
	}

	get data() {
		return {
			successful: this._successful,
			message: this._message
		};
	}

	addFieldError(fieldName, error) {
		this._successful = false;

		if (!this._message.fields[fieldName]) {
			this._message.fields[fieldName] = [];
		}

		this._message.fields[fieldName].push(error);
	}

	addGlobalError(error) {
		this._successful = false;

		this._message.global.push(error);
	}

	setSuccessData(data = {}) {
		this._successful = true;
		this._message = data;
	}
}

exports.ResponceData = ResponceData;

// export default ResponceData;