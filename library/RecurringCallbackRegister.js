class RecurringCallbackRegister {

    /**
     * @param {Object} [config]
     * @param {Function} config.onRecurringCallback
     */
    constructor(config) {
        this.callbackToSetIntervalId = new Map();
        this.onRecurringCallback = config.onRecurringCallback || (() => {});
    }

    /** @return {RecurringCallback[]} */
    getRecurringCallbackList() {
        const recurringCallbackList = [];
        this.callbackToSetIntervalId.forEach((intervalId, recurringCallback) => {
            recurringCallbackList.push(recurringCallback);
        });
        return recurringCallbackList;
    }

    /** @param {RecurringCallback} recurringCallback */
    registerCallbackAndInit(recurringCallback) {
        const self = this;
        const intervalFuncWrapper = function () {
            let callbackResult = recurringCallback.callback();
            if (!callbackResult || callbackResult.toString() !== '[object Promise]') {
                callbackResult = Promise.resolve(callbackResult);
            }
            callbackResult.then(
                result => self.onRecurringCallback(result, recurringCallback)
            );
        };
        const setIntervalId = setInterval(
            intervalFuncWrapper,
            recurringCallback.intervalInMillis
        );
        this.callbackToSetIntervalId.set(recurringCallback, setIntervalId);
    }

    /** @param {RecurringCallback} recurringCallback */
    unregisterCallback(recurringCallback) {
        const intervalId = this.callbackToSetIntervalId.get(recurringCallback);
        if (intervalId) {
            clearInterval(intervalId);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = RecurringCallbackRegister;