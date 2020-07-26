const express = require('express');
const auth = require('./auth');

module.exports = function(server) {
    // API Rotas Abertas
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const AuthService = require('../api/user/authService');
    
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken);

    /**
     * Rotas protejidas por Token JWT
     * Ou seja qualquer requisição que passar pela Api da url será protegida.
     */

     const protectedApi = express.Router();
     server.use('/api', protectedApi);

     protectedApi.use(auth);

    const billingCycleService = require('../api/billingCycle/billingCycleService');
    // todas as requisições serão registradas na url raiz -> billingCycles
    billingCycleService.register(protectedApi, '/billingCycles');

    const billingSummaryService = require('../api/billingSummary/billingSummaryService');
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary);

}