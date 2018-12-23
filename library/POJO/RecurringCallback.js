class RecurringCallback {
    /**
     * @param {Function} callback
     * @param {string} description
     * @param {int} intervalInMillis
     */
    constructor(callback, description, intervalInMillis) {
        /** @return {Promise} **/
        this.callback = () => callback();
        this.description = description;
        this.intervalInMillis = intervalInMillis;
    }
}

module.exports = RecurringCallback;