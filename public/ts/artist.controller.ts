namespace cis450.main {

    export class ArtistController {

        songs: any[];
        artistName: string;
        public constructor(private $http: ng.IHttpService) {}

        public loadSongs = () => {
            let url = "api/artists/" + this.artistName + "/songs";
            this.$http.get(url).then((response) => {
                this.songs = response.data as any[];
            });
        }

    }

    getModule().controller("ArtistController", ArtistController);
}