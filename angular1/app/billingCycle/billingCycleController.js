(function(){
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ]);

    function BillingCycleController($http, msgs, tabs) {
        const self = this;
        const url = 'http://localhost:4004/api/billingCycles';
        self.refresh = function() {
            $http.get(url).then(function(response){
                self.billingCycle = {};
                self.billingCycles = response.data;
                tabs.show(self, {tabList: true, tabCreate: true});
            })
        }
        self.create = function() {
            $http.post(url, self.billingCycle).then(function(response){
                self.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function(response) {
                msgs.addError(response.data.errors); // é errors pois foi definido assim no backend
            });
        }

        self.showTabUpdate = function(billingCycle) {
            self.billingCycle = billingCycle;
            tabs.show(self, {tabUpdate: true});
        }

        self.showTabDelete = function(billingCycle) {
            self.billingCycle = billingCycle;
            tabs.show(self, {tabDelete: true});
        }
        self.refresh();
    }
})()