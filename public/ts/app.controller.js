var cis450;
(function (cis450) {
    var main;
    (function (main) {
        var AppController = (function () {
            function AppController($state) {
                var _this = this;
                this.$state = $state;
                this.isMain = function () {
                    return _this.$state.current.name == 'main';
                };
                this.isSongs = function () {
                    return _this.$state.current.name == 'main.songs';
                };
                this.isGenres = function () {
                    return _this.$state.current.name == 'main.genres';
                };
                this.isTags = function () {
                    return _this.$state.current.name == 'main.tags';
                };
            }
            return AppController;
        }());
        main.AppController = AppController;
        main.getModule().controller("AppController", AppController);
    })(main = cis450.main || (cis450.main = {}));
})(cis450 || (cis450 = {}));
//# sourceMappingURL=app.controller.js.map