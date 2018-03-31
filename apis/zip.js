const formatString = require('../utility/formatString');
var request = require('request');

function parseResponse(response, resolve, reject) {
    if (!response) return reject(new Error('No response specified'));
    if (!response.body) return reject(new Error('No response body present'));
    try {
        var obj = JSON.parse(response.body);
        if (obj) return resolve(obj);
        return reject(Error("response empty"));
    } catch (e) {
        return reject(e);
    }
}

/** Wraps the zipcodeapi API */
function ZipcodeApi(apiKey) {
    this.apiKey = apiKey;
} { // methods
    /** Returns a promise that resolves with the API response:
     * {   
     *     lat: number,
     *     lng: number,
     *     city: string,
     *     state: string
     * }
     */
    ZipcodeApi.prototype.getZipData = function (zip) {
        // https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>.
        var url = "http://www.zipcodeapi.com/rest/{0}/info.{1}/{2}/{3}";
        url = formatString(url, this.apiKey, 'json', zip, 'degrees');

        return new Promise((resolve, reject) => {
            request.get(url, {}, function (err, response) {
                if (err) {
                    console.log("Error with request in getZipData", err);
                    return reject(err);
                } else {
                    return parseResponse(response, resolve, reject);
                }
            });

        });
    };

    ZipcodeApi.prototype.inRadius = function (zip, distanceMiles) {
        // https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/<units>.
        // 0 - key
        // 1 - format json
        // 2 = zip
        // 3 - dist
        // 4- units miles
        var url = 'https://www.zipcodeapi.com/rest/{0}/radius.{1}/{2}/{3}/{4}';
        url = formatString(url, this.apiKey, 'json', zip, distanceMiles, 'mile');

        return new Promise((resolve, reject) => {
            request.get(url, {}, function (err, response) {
                if (err) {
                    console.log("Error with request in inRadius", err);
                    return reject(err);
                } else {
                    return parseResponse(response, resolve, reject);
                }
            });

        });
    }
}


module.exports = ZipcodeApi;