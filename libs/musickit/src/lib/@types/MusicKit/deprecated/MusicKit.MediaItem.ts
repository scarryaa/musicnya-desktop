// export declare module MusicKit {
//   interface MediaItemOptions {
//     attributes: any;
//     id: string | undefined;
//     type: any;
//   }

//   enum MediaItemType {
//     albums,
//     songs,
//     artists,
//     musicVideos,
//     playlists,
//     stations,
//   }

//   /**This class represents a single media item. */
//   export class MediaItem {
//     /**A constructor that creates a new media item from specified options.
//      * @param options The options to use when defining a media item.
//      * @returns a media item. */
//     constructor(options?: MediaItemOptions);

//     /**A string of information about the album. */
//     readonly albumInfo: string;
//     readonly href: string;
//     /**The title of the album. */
//     readonly albumName: string;
//     /**The artist for a media item. */
//     readonly artistName: string;
//     /**The artwork object for the media item. */
//     readonly artwork: Artwork;
//     /**The artwork image for the media item. */
//     readonly artworkURL: string;
//     /**The attributes object for the media item. */
//     readonly attributes: Pick<
//       | MusicKit.Songs
//       | MusicKit.LibrarySongs
//       | MusicKit.Albums
//       | MusicKit.LibraryAlbums
//       | MusicKit.LibraryPlaylists
//       | MusicKit.Playlists,
//       'attributes'
//     >;
//     /**The attributes object for the media item. */
//     readonly contentRating: string;
//     /**The disc number where the media item appears. */
//     readonly discNumber: number;
//     /**The identifier for the media item. */
//     readonly id: string;
//     /**A string of common information about the media item. */
//     readonly info: string;
//     /**A Boolean value that indicates whether the item has explicit lyrics or language. */
//     readonly isExplicitItem: boolean;
//     /**A Boolean value that indicated whether the item is playable. */
//     readonly isPlayable: boolean;
//     /**A Boolean value indicating whether the media item is prepared to play. */
//     readonly isPreparedToPlay: boolean;
//     /**The ISRC (International Standard Recording Code) for a media item. */
//     readonly isrc: string;
//     /**The playback duration of the media item. */
//     readonly playbackDuration: number;
//     /**The playlist artwork image for the media item. */
//     readonly playlistArtworkURL: string;
//     /**The name of the playlist. */
//     readonly playlistName: string;
//     /**The URL to an unencrypted preview of the media item. */
//     readonly previewURL: string;
//     /**The release date of the media item. */
//     readonly releaseDate?: Date | undefined;
//     /**The name of the media item. */
//     readonly title: string;
//     /**The number of the media item in the album's track list. */
//     readonly trackNumber: number;
//     /**The number of the media item in the album's track list. */
//     readonly type: MediaItemType;

//     // Methods

//     /**Prepares a media item for playback.
//      * @returns a void Promise. */
//     prepareToPlay(): Promise<void>;
//   }
// }
