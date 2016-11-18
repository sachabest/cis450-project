namespace cis450.main {

    export class SongsController {

        songName: string = "";
        similarSongs: any;
        public constructor(private $http: ng.IHttpService) {}


        public loadSimilar = () => {
            let url = "api/songs/" + this.songName + "/similar";
            console.log(url);
            this.$http.get(url).then((response) => {
                console.log(response.data);
                this.similarSongs = response.data;
            });
        }
    }

    getModule().controller("SongsController", SongsController);
}