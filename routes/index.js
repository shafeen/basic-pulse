const express = require('express');
const router = express.Router();
const recurringCallbackConfig = require('../recurringCallbackConfig.js');
const callbackStatuses = recurringCallbackConfig();

/* GET home page. */
router.get('/', function(req, res, next) {
    const callbackStatusList = Object.keys(callbackStatuses).map(statusKey => {
        return {
            name: statusKey,
            description: callbackStatuses[statusKey].recurringCallback.description,
            /** @type {MonitorCallbackResult} **/
            lastUpdate: callbackStatuses[statusKey].lastUpdate
        }
    });
    res.render('index', { title: 'basic-pulse' , callbackStatusList: callbackStatusList});
});

module.exports = router;
