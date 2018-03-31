const formatString = require('../utility/formatString');
var request = require('request');

/** Wraps the zipcodeapi API */
function ZipcodeApi(apiKey) {
    this.apiKey = apiKey;
} { // methods
    /** Returns a promise that resolves with the API response */
    ZipcodeApi.prototype.getZipData = function (zip) {
        // https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>.
        var url = "http://www.zipcodeapi.com/rest/{0}/info.{1}/{2}/{3}";
        url = formatString(url, this.apiKey, 'json', zip, 'degrees');

        return new Promise((resolve, reject) => {
            request.get(url, {}, function (err, response) {
                if (err) {
                    console.log("Error with request in getZipData", err);
                    reject(err);
                } else {
                    try {
                        if (response.body) {
                            var json = JSON.parse(response.body);
                            if (json) {
                                resolve(json);
                                return;
                            }
                        }
                        reject(new Error('Response body empty'));
                    } catch (e) {
                        reject(e);
                    }
                }
            });

        });
    };
}

module.exports = ZipcodeApi;