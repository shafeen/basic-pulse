const RecurringCallbackRegister = require('./library/RecurringCallbackRegister.js');
const MonitorRecurringCallbackFactory = require('./library/MonitorRecurringCallbackFactory.js');

// TODO: formalize this and unit test it
// TODO: refactor this out of its rough implementation into a service ASAP!!
function registerCallbacksAndReturnStatusObj() {
    const callbackStatuses = {
        google: {
            recurringCallback: MonitorRecurringCallbackFactory.createRecurringMonitorCallback(
                {
                    fullServiceAddr: 'http://google.com',
                    method: 'GET',
                },
                'Simple GET to google',
                4
            ),
            lastUpdate: null
        },
        yahoo: {
            recurringCallback: MonitorRecurringCallbackFactory.createRecurringMonitorCallback(
                {
                    fullServiceAddr: 'http://yahoo.com',
                    method: 'GET',
                },
                'Simple GET to yahoo',
                4
            ),
            lastUpdate: null
        },
        github: {
            recurringCallback: MonitorRecurringCallbackFactory.createRecurringMonitorCallback(
                {
                    fullServiceAddr: 'http://github.com/badurl-adsfadsfasfsdfsafdasfasdfsadfasdf',
                    method: 'GET',
                },
                'Simple GET to bad github address',
                4
            ),
            lastUpdate: null
        },
        unknown: {
            recurringCallback: MonitorRecurringCallbackFactory.createRecurringMonitorCallback(
                {
                    fullServiceAddr: 'http://oaiudsfyaosidfuyoaiusdfyaisoudfy.com/',
                    method: 'GET',
                },
                'Simple GET to unknown address',
                4
            ),
            lastUpdate: null
        }
    };
    const callbackStatusKeys = Object.keys(callbackStatuses);

    const monitorCallbackRegister = new RecurringCallbackRegister({
        onRecurringCallback: (result, recurringCallback) => {
            console.log('%s: %s', recurringCallback.description, result);
            callbackStatusKeys.some(statusKey => {
                if (callbackStatuses[statusKey].recurringCallback === recurringCallback) {
                    callbackStatuses[statusKey].lastUpdate = result;
                    return true;
                }
            });
        }
    });

    callbackStatusKeys.forEach(statusKey => {
        monitorCallbackRegister.registerCallbackAndInit(
            callbackStatuses[statusKey].recurringCallback
        );
    });

    return callbackStatuses;
}

module.exports = registerCallbacksAndReturnStatusObj;
