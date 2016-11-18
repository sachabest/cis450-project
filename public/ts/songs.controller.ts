namespace cis450.main {

    export class SongsController {

        public songName: string;
        similarSongs: any[];
        chartLabels: string[];
        charData: number[];
        songCount: string = '10';
        public constructor(private $http: ng.IHttpService) {}


        public autocompleteSongs = (name: string) => {
            return this.$http.get("api/autocomplete/songs/" + name).then((response) => {
                return response.data;
            });
        };

        public loadSimilar = () => {
            console.log(this.songName);
            this.$http.get("api/songs/" + this.songName + "/similar").then((response) => {
                console.log('foo');
                console.log(response);
                this.similarSongs = response.data as any[];
            });
        }
    }

    getModule().controller("SongsController", SongsController);
}