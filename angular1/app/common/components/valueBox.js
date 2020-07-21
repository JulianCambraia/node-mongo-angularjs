angular.module('primeiraApp').component('valueBox', {
    bindings: {
        grid: '@',
        colorClass: '@',
        valor: '@',
        label: '@',
        iconeClass: '@',
    },
    controller: [
        'gridSystem',
        function(gridSystem) {
            // temos que usar esta função do ciclo-de-vida do angular 1.5 pois os controllers serão carregados
            // após os bindings serem carregados primeiro
            // Em resumo o controller será executado primeiro que o grid do bindings ser inicializado
            // e o $onInit corrige este problema. Artigo: https://blog.thoughtram.io/angularjs/2016/03/29
            this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid);
        }
    ],
    template: `<div class="{{ $ctrl.gridClasses }}">
                    <div class="small-box {{ $ctrl.colorClass }}">
                        <div class="inner">
                            <h3>{{ $ctrl.valor }}</h3>
                            <p>{{ $ctrl.label }}</p>
                        </div>
                        <div class="icon">
                            <i class="{{ $ctrl.iconeClass }}"></i>
                        </div>
                    </div>
                </div>`
});