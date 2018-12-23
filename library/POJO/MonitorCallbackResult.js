class MonitorCallbackResult {
    /**
     * @param {boolean} requestFailure
     * @param {int} statusCode
     * @param {number} latencyInMs
     * @param {number} size
     * @param {Date} timestamp
     */
    constructor(requestFailure, statusCode, latencyInMs, size, timestamp) {
        this.requestFailure = requestFailure;
        this.statusCode = statusCode;
        this.latencyInMs = latencyInMs;
        this.size = size;
        this.timestamp = timestamp;
    }

    toString() {
        return `MonitorCallbackResult [requestFailure:${this.requestFailure},statusCode:${this.statusCode},latencyInMs:${this.latencyInMs},size:${this.size}]`;
    }
}
module.exports = MonitorCallbackResult;