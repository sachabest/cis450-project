namespace cis450.main {

    export class SongsController {

        public songName: string;
        songId: string;
        similarSongs: any[];
        chartLabels: string[];
        charData: number[];
        songCount: string = '10';
        public constructor(private $http: ng.IHttpService) {}


        public autoCallback = (item: any) => {
            if (item.song_id) {
                this.songId = item.song_id;
            }
        }

        public autocompleteSongs = (name: string) => {
            return this.$http.get("api/autocomplete/songs/" + name).then((response) => {
                return response.data;
            });
        };

        public loadSimilar = () => {
            this.$http.get("api/songs/" + this.songId + "/similar").then((response) => {
                console.log(response.data);
                this.similarSongs = response.data as any[];
            });
        }
    }

    getModule().controller("SongsController", SongsController);
}