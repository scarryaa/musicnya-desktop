export class Song {
    id: number;
    title: string;
    album: string;
    albumId: number;
    artwork?: string;
    artist: string;
    duration: number;
    dateAdded?: number;

    constructor(id: number, title: string, album: string, albumId: number, artist: string, duration: number, artwork?: string, dateAdded?: number) {
        this.id = id;
        this.title = title;
        this.album = album;
        this.albumId = albumId;
        this.artwork = artwork;
        this.artist = artist;
        this.duration = duration;
        this.dateAdded = dateAdded;
    }
}
