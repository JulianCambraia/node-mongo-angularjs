angular.module('primeiraApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "dashboard/dashboard.html"
        }).state('billingCycle', {
            url: "/billingCycles",
            templateUrl: "billingCycle/tabs.html"
        })
        // se não casas com nenhuma URl seta como default dashboard
        $urlRouterProvider.otherwise('/dashboard');
    }
]);