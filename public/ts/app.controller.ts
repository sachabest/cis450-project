namespace cis450.main {

    export class AppController {

        public constructor(private $state: ng.ui.IStateService) {}

        public isMain = () => {
            return this.$state.current.name == 'main';
        }

        public isSongs = () => {
            return this.$state.current.name == 'main.songs';
        }

        public isGenres = () => {
            return this.$state.current.name == 'main.genres';
        }

    }

    getModule().controller("AppController", AppController);
}