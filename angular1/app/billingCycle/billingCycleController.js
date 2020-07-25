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
                self.billingCycle = {credits:[{}], debts:[{}]};
                self.billingCycles = response.data;
                self.calculateValues();
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
            self.calculateValues();
        }

        self.showTabDelete = function(billingCycle) {
            self.billingCycle = billingCycle;
            tabs.show(self, {tabDelete: true});
            self.calculateValues();
        }

        self.delete = function() {
            const deleteUrl = `${url}/${self.billingCycle._id}`;
            $http.delete(deleteUrl, self.billingCycle).then(function(response){
                self.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function(response) {
                msgs.addError(response.data.errors)
            });
        }

        self.update = function() {
            const updateUrl = `${url}/${self.billingCycle._id}`;
            $http.put(updateUrl, self.billingCycle).then(function(response){
                self.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function(response){
                msgs.addError(response.data).errors;
            });
        }

        //  Ações nos botões da Lista de Créditos

        self.addCredit = function(index) {
            self.billingCycle.credits.splice(index + 1, 0, {});
            self.calculateValues();
        }

        self.cloneCredit = function(index, {name, value}) {
            self.billingCycle.credits.splice(index + 1, 0, {name, value});
            self.calculateValues();
        }

        self.deleteCredit = function(index) {
            if (self.billingCycle.credits.length > 1) {
                self.billingCycle.credits.splice(index,1);
                self.calculateValues();
            }
        }

        // Ações nos botões da Lista de Débitos
        self.addDebt = function(index) {
            self.billingCycle.debts.splice(index + 1, 0, {});
        }

        self.cloneDebt = function(index, {name, value,status}) {
            self.billingCycle.debts.splice(index + 1, 0, {name, value, status});
            self.calculateValues();
        }

        self.deleteDebt = function(index) {
            if (self.billingCycle.debts.length > 1) {
                self.billingCycle.debts.splice(index, 1);
                self.calculateValues();
            }
        }

        self.calculateValues = function() {
            self.credit = 0;
            self.debt = 0;

            if (self.billingCycle) {
                self.billingCycle.credits.forEach(function({value}){
                    self.credit += !value || isNaN(value) ? 0 : parseFloat(value);
                });

                self.billingCycle.debts.forEach(function({value}){
                    self.debt += !value || isNaN(value) ? 0 : parseFloat(value);
                })
            } 

            self.total =  self.credit - self.debt;
        }
        
        self.refresh();
    }
})()