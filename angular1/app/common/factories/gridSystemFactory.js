/**
 * Objetivo desta factory: Transformar automaticamente as classes da estrutura de Grid do Bootstrap
 * Ex.: '12' -> 'col-xs-12'
 * '6' -> 'col-xs-6'
 * '12 6' -> 'col-xs-12 col-sm-6'
 * '12 6 4 2' -> 'col-xs-12 col-sm-6 col-md-4 col-lg-2' (celular, tablet, notebook, tela grande)
 * 
 */
angular.module('primeiraApp').factory('gridSystem', [function() {
    function toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : [];
        let classes = '';

        if (cols[0]) classes += `col-xs-${cols[0]}`;
        if (cols[1]) classes += ` col-sm-${cols[1]}`;
        if (cols[2]) classes += ` col-md-${cols[2]}`;
        if (cols[3]) classes += ` col-lg-${cols[3]}`;
        return classes;
    }

    // uma factory sempre devolve um objeto - expõe o Objeto, essa é uma forma simplificada de retorno
    // essa factory poderá ser reusada em outros componentes
    return { toCssClasses };
}]);