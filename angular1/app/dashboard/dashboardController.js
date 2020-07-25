/**
 * Fugindo - Não usando o escopo global - o $scope e sim Controller As
 * Envolvendo-a com uma função anônima local.
 */
(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        '$http',
        DashboardController
    ]);
    
    function DashboardController($http) {
        const self = this;
        self.getSummary = function() {
            const url = 'http://localhost:4004/api/billingSummary';
            // usando uma função do typescript 2015 que é a destruction
            $http.get(url).then(function(response){
                const {credit=0, debt=0} = response.data;
                self.credit = credit;
                self.debt = debt;
                self.total = credit - debt;
            });
        }
    
        self.getSummary();
    }
})()