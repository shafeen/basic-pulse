class MonitorCallbackResult {
    /**
     * @param {boolean} requestFailure
     * @param {int} statusCode
     * @param {number} latencyInMs
     * @param {number} size
     */
    constructor(requestFailure, statusCode, latencyInMs, size) {
        this.requestFailure = requestFailure;
        this.statusCode = statusCode;
        this.latencyInMs = latencyInMs;
        this.size = size;
    }

    toString() {
        return `MonitorCallbackResult [requestFailure:${this.requestFailure},statusCode:${this.statusCode},latencyInMs:${this.latencyInMs},size:${this.size}]`;
    }
}
module.exports = MonitorCallbackResult;