const RecurringCallback = require('./RecurringCallback.js');
class MonitorRecurringCallback extends RecurringCallback {
    /**
     * @param {Function} callback
     * @param {string} description
     * @param {int} intervalInMillis
     */
    constructor(callback, description, intervalInMillis) {
        super(callback, description, intervalInMillis);
        /** @return {Promise<MonitorCallbackResult>} **/
        this.callback = () => callback();
    }
}

module.exports = MonitorRecurringCallback;