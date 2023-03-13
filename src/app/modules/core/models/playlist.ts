import { Song } from "./song";

export class Playlist {
    id: number;
    title: string;
    author: string;
    artwork?: string;
    description: string;
    tracks: Song[];
    dominantColor: string;

    constructor(id: number, title: string, author: string, description: string, tracks: Song[], dominantColor: string, artwork?: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.artwork = artwork;
        this.description = description;
        this.tracks = tracks;
        this.dominantColor = dominantColor;
    }

    totalSongs(): number {
        return this.tracks.length;
    }
}
