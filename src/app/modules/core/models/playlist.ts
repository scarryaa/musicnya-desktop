import { Song } from "./song";

export class Playlist {
    id: number;
    title: string;
    author: string;
    artwork: string;
    description: string;
    tracks: Song[];

    constructor(id: number, title: string, author: string, artwork: string, description: string, tracks: Song[]) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.artwork = artwork;
        this.description = description;
        this.tracks = tracks;
    }

    totalLength(): number {
        var length: number = 0;
        this.tracks.forEach(track => {
            length += track.length;
        });

        return length;
    }
}
