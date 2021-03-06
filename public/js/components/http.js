import utiles from './utiles.js';
import baseUrl from './globalData/baseUrl.js';

class HttpRequester {

    _doRequest({
        method = 'GET',
        url = '',
        callback = utiles.noop,
        data = {},
        base = baseUrl.BASE
    } = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${base}${url}`, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status < 300) {
                const responseText = xhr.responseText;
                try {
                    const response = JSON.parse(responseText);
                    try {
                        callback(null, response);
                    }
                    catch (err) {}
                } catch (err) {
                    callback(err);
                }
            } else {
                try {
                    const response = JSON.parse(xhr.responseText);
                    try {
                        callback(response.error);
                    }
                    catch (err) {}
                } catch (err) {
                    callback(err);
                }
            }
        };

        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.withCredentials = true;

        xhr.send(JSON.stringify(data));      
    }

    doGet({url = '', callback = utiles.noop, data = {}, base = baseUrl.BASE} = {}) {
        this._doRequest({
            method: 'GET', url, callback, data , base
        });
    }

    doPost({url = '', callback = utiles.noop, data = {}, base = baseUrl.BASE} = {}) {
        this._doRequest({
            method: 'POST', url, callback, data, base
        });
    }
}

const httpRequester = new HttpRequester();

export default httpRequester;