export class Song {
    id: number;
    title: string;
    album: string;
    albumId: number;
    artwork: string;
    artist: string;
    length: number;

    constructor(id: number, title: string, album: string, albumId: number, artwork: string, artist: string, length: number) {
        this.id = id;
        this.title = title;
        this.album = album;
        this.albumId = albumId;
        this.artwork = artwork;
        this.artist = artist;
        this.length = length;
    }
}
