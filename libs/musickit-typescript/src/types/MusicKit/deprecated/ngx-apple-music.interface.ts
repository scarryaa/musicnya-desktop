// import { Album, Artist, MusicVideo, Playlist, Song } from "./ngx-apple-music.models";

// export enum PlaylistType {
//     editorial,
//     external,
//     personalMix,
//     replay,
//     userShared
// }

// export enum TrackTypes {
//     musicVideos,
//     songs
// }

// export enum MediaKind {
//     audio,
//     video
// }

// export enum ContentRating {
//     clean,
//     explicit
// }

// type Attributes = {
//     albumName: string;
//     artistName: string;
//     artistUrl?: string;
//     artwork?: Artwork;
//     audioVariants?: string[];
//     composerName?: string;
//     curatorName?: string;
//     contentRating?: ContentRating;
//     copyright?: string;
//     description?: Description;
//     discNumber?: number;
//     durationInMillis: number;
//     editorialNotes?: EditorialNotes;
//     episodeNumber?: string;
//     has4K?: boolean;
//     hasHDR?: boolean;
//     genreNames?: string[];
//     isCompilation: boolean;
//     isComplete: boolean;
//     isChart?: boolean;
//     isLive?: boolean;
//     stationProviderName?: string;
//     mediaKind?: MediaKind;
//     isMasteredForItunes: boolean;
//     isSingle: boolean;
//     hasLyrics: boolean;
//     isAppleDigitalMaster: boolean;
//     isrc?: string;
//     lastModifiedDate?: string;
//     name: string;
//     playParams?: PlayParameters;
//     playlistType?: PlaylistType;
//     previews: Preview;
//     recordLabel?: string;
//     releaseDate?: string;
//     trackCount: number;
//     trackTypes?: TrackTypes[];
//     trackNumber?: number;
//     videoSubType?: string;
//     upc?: string;
//     url: string;

//     //classical only
//     attribution?: string;
//     movementCount?: number;
//     movementName?: string;
//     movementNumber?: number;
//     workId?: string;
//     workName?: string;
// }

// export type AlbumAttributes = Required<Pick<Attributes, 'artistName' | 'artwork' | 'genreNames' | 'isCompilation' |
//     'isComplete' | 'isMasteredForItunes' | 'isSingle' | 'name' | 'trackCount' | 'url'>> 
//     & Partial<Pick<Attributes, 'artistUrl' | 'audioVariants' | 'contentRating' | 'copyright' 
//         | 'editorialNotes' | 'playParams' | 'recordLabel' | 'releaseDate' | 'upc'>>;

// export type ArtistAttributes = Required<Pick<Attributes, 'genreNames' | 'name' | 'url'>>
//     & Partial<Pick<Attributes, 'artwork' | 'editorialNotes'>>;

// export type SongAttributes = Required<Pick<Attributes, 'albumName' | 'artistName' | 'artwork' | 'genreNames' | 'hasLyrics' | 'isAppleDigitalMaster' | 'name' |
//     'previews' | 'url' | 'durationInMillis'>>
//     & Partial<Pick<Attributes, 'artistUrl' | 'attribution' | 'audioVariants' | 'composerName' | 'contentRating' | 'discNumber' | 'editorialNotes' | 'isrc' |
//         'movementCount' | 'movementName' | 'movementNumber' | 'playParams' | 'releaseDate' | 'trackNumber' | 'workName'>>;

// export type MusicVideoAttributes = Required<Pick<Attributes, 'artistName' | 'artwork' | 'durationInMillis' | 'genreNames' | 'has4K' | 'hasHDR' | 'name' |
//     'previews' | 'url'>>
//     & Partial<Pick<Attributes, 'albumName' | 'artistUrl' | 'contentRating' | 'editorialNotes' | 'isrc' | 'playParams' | 'releaseDate' | 'trackNumber' |
//         'videoSubType' | 'workId' | 'workName'>>;

// export type PlaylistAttributes = Required<Pick<Attributes, 'curatorName' | 'isChart' | 'name' | 'playlistType' | 'url'>> 
//     & Partial<Pick<Attributes, 'artwork' | 'description' | 'lastModifiedDate' | 'playParams' | 'trackTypes'>>;

// export type StationAttributes = Required<Pick<Attributes, 'artwork' | 'isLive' | 'mediaKind' | 'name' | 'url'>> 
//     & Partial<Pick<Attributes, 'durationInMillis' | 'editorialNotes' | 'episodeNumber' | 'contentRating' | 'playParams' | 'stationProviderName'>>;

// export type ViewAttributes = {
//     title: string;
// }

// export type GenreAttributes = {
//     name: string;
//     parentId?: string;
//     parentName?: string;
//     chartLabel?: string;
// }

// export type RecordLabelAttributes = {
//     artwork: Artwork;
//     description?: Description;
//     name: string;
//     url: string;
// }

// export type LibraryAlbumAttributes = {
//     artistName: string;
//     artwork: Artwork;
//     contentRating?: ContentRating;
//     dateAdded?: string;
//     name: string;
//     playParams?: PlayParameters;
//     releaseDate?: string;
//     trackCount: number;
//     genreNames: string[];
// }

// export type LibraryMusicVideoAttributes = {
//     albumName?: string;
//     artistName: string;
//     artwork: Artwork;
//     contentRating?: ContentRating;
//     durationInMillis: number;
//     genreNames: string[];
//     name: string;
//     playParams?: PlayParameters;
//     releaseDate?: string;
//     trackNumber?: number;
// }

// export type LibraryArtistAttributes = {
//     name: string;
// }

// export type LibrarySongAttributes = {
//     albumName?: string;
//     artistName: string;
//     artwork: Artwork;
//     contentRating?: ContentRating;
//     discNumber?: number;
//     durationInMillis: number;
//     genreNames: string[];
//     hasLyrics: boolean;
//     name: string;
//     playParams?: PlayParameters;
//     releaseDate?: string;
//     trackNumber?: number;
// }

// export type Genre = {
//     id: string;
//     type: string;
//     href: string;
//     attributes?: GenreAttributes;
// }

// export type RecordLabel = {
//     id: string;
//     type: any;
//     href: string;
//     attributes?: RecordLabelAttributes;
//     views: RecordLabelViews;
// }

// export type Track = {
//     data: Array<MusicVideo | Song>;
//     href?: string;
//     next?: string;
// }

// export type LibraryAlbum = {
//     id: string;
//     type: any;
//     href: string;
//     attributes?: LibraryAlbumAttributes;
//     relationships?: LibraryAlbumRelationships;
// }

// export type LibraryArtist = {
//     id: string;
//     type: any;
//     href: string;
//     attributes?: LibraryArtistAttributes;
//     relationships?: LibraryArtistRelationships;
// }

// export type LibraryMusicVideo = {
//     id: string;
//     type: any;
//     href: string;
//     attributes?: LibraryMusicVideoAttributes;
//     relationships?: LibraryMusicVideoRelationships;
// }

// export type LibrarySong = {
//     id: string;
//     type: any;
//     href: string;
//     attributes?: LibrarySongAttributes;
//     relationships?: LibrarySongRelationships;
// }

// export type View<T> = {
//     href?: string;
//     next?: string;
//     attributes: ViewAttributes;
//     data: T[];
// }

// export type RecordLabelViews = {
//     latestReleases?: View<Album>;
//     topReleases?: View<Album>;
// }

// export type AlbumViews = {
//     appearsOn?: View<Playlist>;
//     otherVersions?: View<Album>;
//     relatedAlbums?: View<Album>;
//     relatedVideos?: View<MusicVideo>;
// }

// export type ArtistViews = {
//     appearsOnAlbums?: View<Album>;
//     compilationAlbums?: View<Album>;
//     featuredAlbums?: View<Album>;
//     featuredMusicVideos?: View<MusicVideo>;
//     featuredPlaylists?: View<Playlist>;
//     fullAlbums: View<Album>;
//     latestReleases: View<Album>;
//     liveAlbums: View<Album>;
//     similarArtists: View<Artist>;
//     singles: View<Album>;
//     topMusicVideos: View<MusicVideo>;
//     topSongs: View<Song>;
// }

// export type MusicVideoViews = {
//     moreByArtist: View<MusicVideo>;
//     moreInGenre: View<MusicVideo>;
// }

// export type PlaylistViews = {
//     featuredArtists: View<Artist>;
//     moreByCurator: View<Playlist>;
// }

// export type Relationship<T> = {
//     href?: string;
//     next?: string;
//     data?: T[];
//     meta?: any;
// }

// export type LibraryAlbumRelationships = {
//     artists?: Relationship<LibraryArtist>;
//     catalog?: Relationship<Album>;
//     tracks?: Relationship<Array<LibraryMusicVideo | LibrarySong>>;
// }

// export type LibraryMusicVideoRelationships = {
//     albums?: Relationship<LibraryAlbum>;
//     artists?: Relationship<LibraryArtist>;
//     catalog?: Relationship<MusicVideo>;
// }

// export type LibraryArtistRelationships = {
//     albums?: Relationship<LibraryAlbum>;
//     artists?: Relationship<LibraryArtist>;
//     catalog?: Relationship<MusicVideo>;
// }

// export type LibrarySongRelationships = {
//     albums?: Relationship<LibraryAlbum>;
//     artists?: Relationship<LibraryArtist>;
//     catalog?: Relationship<Song>;
// }

// export type AlbumRelationships = {
//     artists: Relationship<Artist>;
//     genres: Relationship<Genre>;
//     tracks: Relationship<Track>;
//     library: Relationship<LibraryAlbum>;
//     recordLabels: Relationship<RecordLabel>;   
// }

// export type ArtistRelationships = {
//     albums: any;
//     genres: any;
//     musicVideos: any;
//     playlists: any;
//     station: any;
// }

// export type SongRelationships = {
//     albums: any;
//     artists: any;
//     composers: any;
//     genres: any;
//     library: any;
//     musicVideos: any;
//     station: any;
// }

// export type MusicVideoRelationships = {
//     albums: any;
//     artists: any;
//     genres: any;
//     library: any;
//     songs: any;
// }

// export type PlaylistRelationships = {
//     curator: any;
//     library: any;
//     tracks: any;
// }

// export type StationRelationships = {
//     radioShow: any;
// }

// export interface EditorialNotes {
//     short?: string;
//     standard?: string;
//     name?: string;
//     tagline?: string;
// }

// export interface PlayParameters {
//     id: string;
//     kind: MediaKind;
// }

// export interface Artwork {
//     bgColor?: string;
//     height: number;
//     width: number;
//     textColor1?: string;
//     textColor2?: string;
//     textColor3?: string;
//     textColor4?: string;
//     url: string;
// }

// export interface Description {
//     short?: string;
//     standard: string;
// }

// export interface Preview {
//     artwork?: Artwork;
//     url: string;
//     hlsUrl?: string;
// }

// export interface MediaItemConstructor<T> {
//     new(): MediaItem<T>;
// }

// export type MediaItem<T> = {
//     id: string;
//     type: MediaItemType;
//     href: string;
//     attributes?: AlbumAttributes | ArtistAttributes | MusicVideoAttributes | SongAttributes | StationAttributes | PlaylistAttributes;
//     relationships?: Relationship<T>;
//     views?: View<T>;

//     //return promise
//     prepareToPlay(): any;
// }

// export type MediaItemOptions = {
//     attributes: any;
//     id: string | undefined;
//     type: MediaItemType;
// }