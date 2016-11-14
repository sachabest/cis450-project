namespace cis450.main {

    var app = angular.module('cis450', [
        'ui.bootstrap',
        'ui.router'
    ]);

    export var getModule = () => {
        return angular.module('cis450');
    }
}