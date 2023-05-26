import { MusicKit } from 'types/musickit';

export interface Artwork {
  bgColor?: string;
  height: number;
  width: number;
  textColor1?: string;
  textColor2?: string;
  textColor3?: string;
  textColor4?: string;
  url: string;
}

export interface View {
  href?: string;
  meta?: { [key: string]: any };
  next?: string;
  attributes?: { [key: string]: any };
  data: Resource | Resource[];
}

export interface LibraryAlbums {
  id: string;
  type: 'library-albums';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
    artwork: Artwork;
    playParams: PlayParameters;
    dateAdded?: string;
    isComplete: boolean;
    isSingle: boolean;
    hasLyrics: boolean;
    url: string;
    trackCount: number;
    isMasteredForItunes: boolean;
    releaseDate?: string;
    recordLabel: string;
    genreNames: string[];
    durationInMillis: number;
  };
  relationships?: {
    artists: Relationship;
    catalog: Relationship;
    tracks: Relationship;
  };
}

export interface LibraryPlaylists {
  id: string;
  type: 'library-playlists';
  href: string;
  attributes?: {
    name: string;
    description?: string;
    lastModifiedDate: string;
    canEdit: boolean;
    dateCreated: string;
    hasCatalog: boolean;
    isPublic: boolean;
    isPublished: boolean;
    playParams: PlayParameters;
    url: string;
    durationInMillis: number;
    artwork: Artwork;
  };
  relationships?: {
    curator?: Relationship;
    tracks?: Relationship;
    catalog?: Relationship;
  };
}

export interface LibrarySongs {
  id: string;
  type: 'library-songs';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    albumName?: string;
    composerName?: string;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
    artwork: Artwork;
    trackNumber: number;
    discNumber: number;
    durationInMillis: number;
    genreNames: string[];
    isrc?: string;
    hasLyrics: boolean;
    playParams: PlayParameters;
    trackCount?: number;
    url: string;
    releaseDate?: string;
    isSingle: boolean;
    isMasteredForItunes: boolean;
    albumArtistName?: string;
    audioFileURL?: string;
    movementCount?: number;
    movementName?: string;
    movementNumber?: number;
    workName?: string;
  };
  relationships?: {
    artists: Relationship;
    albums: Relationship;
    genres: Relationship;
    playlists: Relationship;
    station?: Relationship;
  };
}

export interface Albums {
  id: string;
  type: 'albums';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    isComplete: boolean;
    isSingle: boolean;
    hasLyrics: boolean;
    url: string;
    artwork: Artwork;
    playParams: PlayParameters;
    trackCount: number;
    isMasteredForItunes: boolean;
    releaseDate: string;
    recordLabel: string;
    genreNames: string[];
    durationInMillis: number;
  };
  relationships?: {
    artists: Relationship;
    tracks: Relationship;
    genres: Relationship;
  };
}

export interface Playlists {
  id: string;
  type: 'playlists';
  href: string;
  attributes?: {
    name: string;
    description?: string;
    lastModifiedDate: string;
    canEdit: boolean;
    dateCreated: string;
    hasCatalog: boolean;
    isPublic: boolean;
    isPublished: boolean;
    playParams: PlayParameters;
    url: string;
    durationInMillis: number;
    artwork: Artwork;
  };
  relationships?: {
    curator: Relationship;
    tracks: Relationship;
    genres: Relationship;
  };
}

export interface Songs {
  id: string;
  type: 'songs';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    albumName?: string;
    composerName?: string;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
    artwork: Artwork;
    trackNumber: number;
    discNumber: number;
    durationInMillis: number;
    genreNames: string[];
    isrc?: string;
    hasLyrics: boolean;
    playParams: PlayParameters;
    trackCount?: number;
    url: string;
    releaseDate?: string;
    isSingle: boolean;
    isMasteredForItunes: boolean;
    albumArtistName?: string;
    audioFileURL?: string;
    movementCount?: number;
    movementName?: string;
    movementNumber?: number;
    workName?: string;
  };
  relationships?: {
    artists: Relationship;
    albums: Relationship;
    genres: Relationship;
    playlists: Relationship;
    station?: Relationship;
  };
}

export interface PersonalRecommendation {
  id: string;
  type: 'personal-recommendation';
  href: string;
  attributes?: {
    nextUpdateDate?: string;
  };
  relationships?: {
    contents: Relationship;
  };
}

export interface MusicVideos {
  id: string;
  type: 'music-videos';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    artwork: Artwork;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
    trackNumber: number;
    trackCount: number;
    discNumber: number;
    genreNames: string[];
    durationInMillis: number;
    releaseDate: string;
    url: string;
    playParams: PlayParameters;
    isrc?: string;
  };
}

export interface Stations {
  id: string;
  type: 'stations';
  href: string;
  attributes?: {
    name: string;
    artwork: Artwork;
    durationInMillis: number;
    url: string;
    playParams: PlayParameters;
  };
}

export interface Artists {
  id: string;
  type: 'artists';
  href: string;
  attributes?: {
    name: string;
    isBand: boolean;
    url: string;
    genreNames: string[];
    editorialNotes?: EditorialNotes;
    artwork: Artwork;
    playParams: PlayParameters;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
  };
  relationships?: {
    albums: Relationship;
    genres: Relationship;
  };
}

export interface Curators {
  id: string;
  type: 'curators';
  href: string;
  attributes?: {
    name: string;
    url: string;
    artwork: Artwork;
    playParams: PlayParameters;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
  };
  relationships?: {
    playlists: Relationship;
  };
}

export interface Activities {
  id: string;
  type: 'activities';
  href: string;
  attributes?: {
    name: string;
    url: string;
    artwork: Artwork;
    playParams: PlayParameters;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
  };
  relationships?: {
    playlists: Relationship;
  };
}

export interface AppleCurators {
  id: string;
  type: 'apple-curators';
  href: string;
  attributes?: {
    name: string;
    url: string;
    artwork: Artwork;
    playParams: PlayParameters;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
  };
  relationships?: {
    playlists: Relationship;
  };
}

export interface MediaItem {
  id: string;
  type:
    | 'library-albums'
    | 'library-playlists'
    | 'library-songs'
    | 'albums'
    | 'playlists'
    | 'songs'
    | 'personal-recommendation'
    | 'music-videos'
    | 'stations'
    | 'artists'
    | 'curators'
    | 'activities'
    | 'apple-curators';
  href: string;
  attributes?: {
    name: string;
    artistName: string;
    albumName?: string;
    composerName?: string;
  };
}

export interface Resource {
  id: string;
  type: string;
  href?: string;
  attributes?: {
    name?: string;
    artistName?: string;
    albumName?: string;
    composerName?: string;
    isrc?: string;
    hasLyrics?: boolean;
    url?: string;
    genreNames?: string[];
    releaseDate?: string;
    trackNumber?: number;
    discNumber?: number;
    durationInMillis?: number;
    artwork?: Artwork;
    playParams?: PlayParameters;
    contentRating?: 'clean' | 'explicit' | 'notExplicit';
  };
  relationships?: {
    albums?: Relationship;
    artists?: Relationship;
    curators?: Relationship;
    playlists?: Relationship;
    genres?: Relationship;
    tracks?: Relationship;
    station?: Relationship;
  };
}

export interface PlayParameters {
  id: string;
  kind: 'song' | 'album' | 'playlist' | 'music-video' | 'station';
}

export interface EditorialNotes {
  short: string;
  standard: string;
}

export interface Relationship {
  data?: Resource[];
  href?: string;
  next?: string;
}

export interface MusicKit {
  isAuthorized: boolean;
  isAuthorizedForPlay: boolean;
  isAuthorizedForSubscription: boolean;
  isAuthorizedForCloudLibrary: boolean;
  developerToken: string;
  musicUserToken: string;
  storefrontId: string;
  apiVersion: number;
  library: Library;
  playback: Playback;
  setQueue: (queue: MKMediaItem[]) => Promise<void>;
  setQueueFromSongId: (songId: string) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  skipToNextItem: () => Promise<void>;
  skipToPreviousItem: () => Promise<void>;
  seekToTime: (time: number) => Promise<void>;
  prepareToPlay: () => Promise<void>;
  changeToMediaAtIndex: (index: number) => Promise<void>;
  nowPlayingItemIndex: number;
  nowPlayingItem: MKMediaItem;
}

export interface Library {
  requestCapabilities: () => Promise<{
    canAddToLibrary: boolean;
    canAddToCloudLibrary: boolean;
  }>;
  requestAuthorization: () => Promise<boolean>;
  getCapabilities: () => Promise<{
    canAddToLibrary: boolean;
    canAddToCloudLibrary: boolean;
  }>;
  getLibrarySongs: (options?: {
    limit?: number;
    offset?: number;
    include?: string;
  }) => Promise<LibrarySongs>;
  getLibraryAlbums: (options?: {
    limit?: number;
    offset?: number;
    include?: string;
  }) => Promise<LibraryAlbums>;
  getLibraryPlaylists: (options?: {
    limit?: number;
    offset?: number;
    include?: string;
  }) => Promise<LibraryPlaylists>;
  addToLibrary: (mediaItem: MKMediaItem) => Promise<void>;
  removeFromLibrary: (mediaItem: MKMediaItem) => Promise<void>;
  getRecentPlayed: (options?: {
    limit?: number;
    offset?: number;
    include?: string;
  }) => Promise<LibrarySongs>;
  getRecentAdded: (options?: {
    limit?: number;
    offset?: number;
    include?: string;
  }) => Promise<LibrarySongs>;
  getAlbum: (
    albumId: string,
    options?: {
      include?: string;
    }
  ) => Promise<Albums>;
  getAlbums: (
    albumIds: string[],
    options?: {
      include?: string;
    }
  ) => Promise<Albums>;
  getPlaylist: (
    playlistId: string,
    options?: {
      include?: string;
    }
  ) => Promise<Playlists>;
  getPlaylists: (
    playlistIds: string[],
    options?: {
      include?: string;
    }
  ) => Promise<Playlists>;
  getSong: (
    songId: string,
    options?: {
      include?: string;
    }
  ) => Promise<Songs>;
  getSongs: (
    songIds: string[],
    options?: {
      include?: string;
    }
  ) => Promise<Songs>;
  getStorefrontCountryCode: () => Promise<string>;
}

export type MediaItemTypes =
  | 'library-albums'
  | 'library-playlists'
  | 'library-songs'
  | 'albums'
  | 'playlists'
  | 'songs'
  | 'personal-recommendation'
  | 'music-videos'
  | 'stations'
  | 'artists'
  | 'curators'
  | 'activities'
  | 'apple-curators';

export interface Playback {
  playbackState: 'none' | 'playing' | 'paused' | 'stopped';
  playbackDuration: number;
  playbackTime: number;
  playbackQueue: MKMediaItem[];
  playbackTargetAvailable: boolean;
  playbackTarget: string;
  playbackVolume: number;
  playbackRepeatMode: 'none' | 'one' | 'all';
  playbackShuffleMode: 'off' | 'songs' | 'albums';
  prepareToPlay: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  skipToNextItem: () => Promise<void>;
  skipToPreviousItem: () => Promise<void>;
  seekToTime: (time: number) => Promise<void>;
  changeToMediaAtIndex: (index: number) => Promise<void>;
  setQueue: (queue: MKMediaItem[]) => Promise<void>;
  setQueueFromSongId: (songId: string) => Promise<void>;
  setRepeatMode: (mode: 'none' | 'one' | 'all') => Promise<void>;
  setShuffleMode: (mode: 'off' | 'songs' | 'albums') => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setPlaybackTarget: (target: string) => Promise<void>;
  nowPlayingItemIndex: number;
  nowPlayingItem: MKMediaItem;
}

export type MKMediaItem =
  | MusicKit.LibraryAlbums
  | MusicKit.LibraryPlaylists
  | MusicKit.LibrarySongs
  | MusicKit.Albums
  | MusicKit.Playlists
  | MusicKit.Songs
  | MusicKit.PersonalRecommendation
  | MusicKit.MusicVideos
  | MusicKit.Stations
  | MusicKit.Artists
  | MusicKit.Curators
  | MusicKit.Activities
  | MusicKit.AppleCurators
  | MusicKit.MediaItem;
