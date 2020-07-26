(function(){
    angular.module('primeiraApp').component('paginator', {
        bindings: {
            url: '@',
            pages: '@',
        },
        controller: [
            '$location',
            function($location) {
                this.$onChanges = () => {
                    const paginas = parseInt(this.pages) || 1;
                    this.paginasArray = Array(paginas).fill(0).map((el, idx) => idx + 1);
                    this.current = parseInt($location.search().page) || 1;
                    this.needPagination = this.pages > 1;
                    this.hasPrev = this.current > 1;
                    this.hasNext = this.current < this.pages;
    
                    this.isPageCurrent = function(i) {
                        return this.current == i;
                    }
                }
            }
        ],
        template:`
        <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
                <li ng-if="$ctrl.hasPrev">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1 }}">Anterior</a>
                </li>
                <li ng-class=" {active: $ctrl.isPageCurrent(index)}" ng-repeat="index in $ctrl.paginasArray">
                    <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
                </li>
                <li ng-if="$ctrl.hasNext">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">Próximo</a>
                </li>
            </ul>
        `
    });
})()