const express = require('express');

module.exports = function(server) {
    // API Routers
    const router = express.Router();
    server.use('/api', router);

    const billingCycleService = require('../api/billingCycle/billingCycleService');
    // todas as requisições serão registradas na url raiz -> billingCycles
    billingCycleService.register(router, '/billingCycles');

    const billingSummaryService = require('../api/billingSummary/billingSummaryService');
    router.route('/billingSummary').get(billingSummaryService.getSummary);

}