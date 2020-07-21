const BillingCycle = require('./billingCycle');
const { response } = require('../../config/server');
const _ = require('lodash');

// o node-rest cria vários serviços na API com o padrão dos verbos mais comuns do Http
BillingCycle.methods(['get', 'post', 'put', 'delete']);
// - updateOptions é para que ao realizar o PUT o retorno seja sempre do novo registro atualizado
// - runValidators é para garantir que as validações de required sejam concistidas
BillingCycle.updateOptions({new: true, runValidators:true});

// Tratamento de Erros
BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle;

    if (bundle.errors) {
        var errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    } else {
        next();
    }
}

function parseErrors(nodeRestfullErrors) {
    const errors = [];
    _.forIn(nodeRestfullErrors, error => errors.push(error.message));
    return errors;

}

// acessando a API rest
BillingCycle.route('count', function(req, res, next){
    // acessando a api do mongoDb
    BillingCycle.countDocuments(function(error, value){
        if (error) {
            res.status(500).json({errors: [error]});
        } else {
            res.json({value});
        }
    });
});

// exporta para ser usado nas rotas
module.exports = BillingCycle;
