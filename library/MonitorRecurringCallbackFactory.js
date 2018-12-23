const MonitorRecurringCallback = require('./POJO/MonitorRecurringCallback.js');
const RecurringCallback = require('./POJO/RecurringCallback.js');
const MonitorCallbackResult = require('./POJO/MonitorCallbackResult.js');
const request = require('request-promise-native');

class MonitorRecurringCallbackFactory {

    /**
     * NOTE: Currently ONLY supports json POST endpoints, behavior unknown otherwise.
     *
     * @param {Object} requestConfig
     * @param {String} requestConfig.fullServiceAddr
     * @param {String} requestConfig.method
     * @param {Object} [requestConfig.queryData]
     * @param {Object} [requestConfig.data]
     * @param {String} description
     * @param {int} intervalInSeconds
     *
     * @return {MonitorRecurringCallback}
     */
    static createRecurringMonitorCallback(requestConfig, description, intervalInSeconds) {
        const asyncCallback = async function () {
            let responseObj = null;
            try {
                responseObj = await request(
                    MonitorRecurringCallbackFactory._getRequestConfigObject(requestConfig)
                );
            } catch (requestError) {
                if (requestError.name === 'StatusCodeError') {
                    responseObj = requestError.response;
                }
            }
            return new MonitorCallbackResult(
                responseObj === null,
                responseObj? responseObj.statusCode : undefined,
                responseObj? parseInt(responseObj.timings.end) : undefined,
                responseObj? responseObj.body.length : undefined,
                new Date(Date.now())
            );
        };
        return new MonitorRecurringCallback(
            asyncCallback, description, intervalInSeconds*1000
        );
    }

    /**
     * @private
     * @param {Object} requestConfig
     * @param {String} requestConfig.fullServiceAddr
     * @param {String} requestConfig.method
     * @param {Object} [requestConfig.queryData]
     * @param {Object} [requestConfig.data]
     */
    static _getRequestConfigObject(requestConfig) {
        if (!MonitorRecurringCallbackFactory.allowedMethodsTypes.has(requestConfig.method)) {
            throw new Error(`Invalid request method: ${requestConfig.method}`);
        }
        return {
            resolveWithFullResponse: true,
            method: requestConfig.method,
            url: `${requestConfig.fullServiceAddr}`,
            json: requestConfig.method === 'POST',
            qs: requestConfig.queryData,
            body: requestConfig.data,
            time: true
        };
    }
}
MonitorRecurringCallbackFactory.allowedMethodsTypes = new Set(['GET', 'POST']);

module.exports = MonitorRecurringCallbackFactory;