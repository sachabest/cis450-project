namespace cis450.main {

    getModule().config(($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'html/layout.html',
            controller: 'AppController',
            controllerAs: 'ctrl',
        })
        .state('main.songs', {
            url: 'songs',
            templateUrl: 'html/songs.html',
            controller: 'SongsController',
            controllerAs: 'ctrl',
        })
        .state('main.genres', {
            url: 'genres',
            templateUrl: 'html/genres.html',
            controller: 'GenresController',
            controllerAs: 'ctrl'
        });
    });
}