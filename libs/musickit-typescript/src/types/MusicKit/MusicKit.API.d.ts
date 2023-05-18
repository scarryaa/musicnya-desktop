declare namespace MusicKit {
  /**An instance of {@link MusicKitAPI} is made available on configured instances of {@link MusicKit} as the property {@link MusicKitInstance.api api}.
   *
   * The primary use of the API class is to facilitate making requests to the Apple Music API, which is done via the ‘passthrough API’ method api.music(...).
   *
   * The {@link api.music()} method will handle appending the Developer Token (JWT) in the Authorization header,
   * the Music User Token (MUT) for personalized requests, and can help abstract the user’s storefront from the URLs passed in.
   *
   * @example
   * ```
   * const music = MusicKit.getInstance();
   *
   * // {{storefrontId}} is replaced with the current user’s storefront automatically
   *
   * const result = await music.api.music('/v1/catalog/{{storefrontId}}/albums/1025210938');
   * ``` */

  interface Artwork {
    /**The average background color of the image. */
    bgColor?: string;
    /**The average background color of the image. */
    height: number | null;
    /**The maximum width available for the image. */
    width: number | null;
    /**The primary text color used if the background color gets displayed. */
    textColor1?: string;
    /**The secondary text color used if the background color gets displayed. */
    textColor2?: string;
    /**The tertiary text color used if the background color gets displayed. */
    textColor3?: string;
    /**The final post-tertiary text color used if the background color gets displayed. */
    textColor4?: string;
    /**The URL to request the image asset.
     *
     * {w}x{h}must precede image filename, as placeholders for the width and height values as described above.
     *
     * For example, {w}x{h}bb.jpeg). */
    url: string;
    hasP3?: boolean;
  }

  /**
   * An object that represents a unique identifier for a music item.
   * https://developer.apple.com/documentation/musickit/musicitemid
   */
  type MusicItemID = string;

  /**
   * A protocol for music items that your app can fetch by using a catalog charts request.
   * https://developer.apple.com/documentation/musickit/musiccatalogchartrequestable
   */
  type MusicCatalogChartRequestable =
    | "albums"
    | "music-videos"
    | "playlists"
    | "songs";

  /**
   * The rating of the content that potentially plays while playing a resource.
   * A nil value means no rating is available for this resource.
   * https://developer.apple.com/documentation/musickit/contentrating
   */
  type ContentRating = "clean" | "explicit" | null;

  /**
   * A to-one or to-many relationship from one resource object to others.
   * https://developer.apple.com/documentation/applemusicapi/relationship
   */
  interface Relationship<Data> {
    href?: string;
    next?: string;
    data: Data[];
    contents?: Array<{ data: Array<Resource> }>;
    meta?: Record<string, any>;
  }

  /**
   * A to-one or to-many relationship view from one resource object to others representing interesting associations.
   * https://developer.apple.com/documentation/applemusicapi/view
   */
  interface View<Data> {
    href?: string;
    next?: string;
    attributes?: {
      title: string;
    };
    data: Data[];
    meta?: Record<string, any>;
  }

  /**
   * A resource—such as an album, song, or playlist.
   * https://developer.apple.com/documentation/applemusicapi/resource
   */
  interface Resource {
    id: string;
    type: string;
    href: string;
    attributes?: Record<string, any>;
    relationships?:
      | Record<string, Relationship<Resource> | Array<Relationship<Resource>>>
      | { contents: { data: Array<Resource> } };
    meta?: Record<string, any>;
    views?: Record<string, View<Resource>>;
  }

  /**
   * A resource object that represents a storefront, an Apple Music and iTunes Store territory that the content is available in.
   * https://developer.apple.com/documentation/applemusicapi/storefronts
   */
  interface Storefronts extends Resource {
    type: "storefronts";
    attributes?: {
      defaultLanguageTag: string;
      explicitContentPolicy: "allowed" | "opt-in" | "prohibited";
      name: string;
      supportedLanguageTags: string[];
    };
  }

  /**
   * A resource object that represents a music genre.
   * https://developer.apple.com/documentation/applemusicapi/genres
   */
  interface Genres extends Resource {
    type: "genres";
    attributes?: {
      name: string;
      parentId?: string;
      parentName?: string;
    };
  }

  /**
   * A resource object that represents a song.
   * https://developer.apple.com/documentation/applemusicapi/songs-um8
   */
  interface Songs extends Resource {
    id: MusicItemID;
    type: "songs";
    attributes?: {
      albumName: string;
      artistName: string;
      artwork: Artwork;
      attribution?: string;
      audioLocale?: string;
      audioTraits?: string[];
      composerName?: string;
      contentRating?: ContentRating;
      discNumber?: number;
      durationInMillis: number;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      hasLyrics: boolean;
      hasTimeSyncedLyrics?: boolean;
      isVocalAttenuationAllowed?: boolean;
      isMasteredForItunes?: boolean;
      isAppleDigitalMaster?: boolean;
      isrc?: string;
      movementCount?: number;
      movementName?: string;
      movementNumber?: number;
      name: string;
      playParams?: PlayParameters;
      previews: Preview[];
      releaseDate?: string;
      trackNumber?: number;
      url: string;
      workName?: string;
      artistUrl?: string;
    };
    relationships?: {
      albums: Relationship<Albums>;
      artists: Relationship<Artists>;
      genres: Relationship<Genres>;
      station: Relationship<Stations>;
      composers: Relationship<Artists>;
      library: Relationship<LibraryAlbums>;
      "music-videos": Relationship<MusicVideos>;
    };
  }

  interface LibrarySongs extends Resource {
    id: MusicItemID;
    type: "library-songs";
    attributes?: {
      albumName: string;
      artistName: string;
      artwork: Artwork;
      attribution?: string;
      audioLocale?: string;
      audioTraits?: string[];
      composerName?: string;
      contentRating?: ContentRating;
      discNumber?: number;
      durationInMillis: number;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      hasLyrics: boolean;
      hasTimeSyncedLyrics?: boolean;
      isVocalAttenuationAllowed?: boolean;
      isMasteredForItunes?: boolean;
      isAppleDigitalMaster?: boolean;
      isrc?: string;
      movementCount?: number;
      movementName?: string;
      movementNumber?: number;
      name: string;
      playParams?: PlayParameters;
      previews: Preview[];
      releaseDate?: string;
      trackNumber?: number;
      url: string;
      workName?: string;
      artistUrl?: string;
    };
    relationships?: {
      albums: Relationship<Albums>;
      artists: Relationship<Artists>;
      genres: Relationship<Genres>;
      station: Relationship<Stations>;
      catalog?: Relationship<Songs>;
      composers: Relationship<Artists>;
      library: Relationship<LibraryAlbums>;
      "music-videos": Relationship<MusicVideos>;
    };
  }

  /**
   * A resource object that represents a music video.
   * https://developer.apple.com/documentation/applemusicapi/musicvideos/
   */
  interface MusicVideos extends Resource {
    id: MusicItemID;
    type: "music-videos";
    attributes?: {
      albumName?: string;
      artistName: string;
      artwork: Artwork;
      contentRating?: ContentRating;
      durationInMillis: number;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      has4K: boolean;
      hasHDR: boolean;
      isrc?: string;
      name: string;
      playParams?: PlayParameters;
      previews: Preview[];
      releaseDate?: string;
      trackNumber?: number;
      url: string;
      videoSubType?: "preview";
      workId?: string;
      workName?: string;
      artistUrl?: string;
    };
    relationships: {
      albums: Relationship<Albums>;
      genres: Relationship<Genres>;
      library: Relationship<LibraryAlbums>;
      songs: Relationship<Songs>;
    };
    views: {
      "more-by-artist": View<MusicVideos>;
      "more-in-genre": View<MusicVideos>;
    };
  }

  /**
   * A resource object that represents an Apple curator.
   * https://developer.apple.com/documentation/applemusicapi/applecurators/
   */
  interface AppleCurators extends Resource {
    type: "apple-curators";
    attributes?: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      kind: "Curator" | "Genre" | "Show";
      name: string;
      shortName?: string;
      showHostName?: string;
      url: string;
    };
    relationships?: {
      playlists: Relationship<Playlists>;
    };
  }

  /**
   * A resource object that represents a curator.
   * https://developer.apple.com/documentation/applemusicapi/curators-uja
   */
  interface Curators extends Resource {
    type: "curators";
    attributes?: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      name: string;
      url: string;
    };
    relationships: {
      playlists: Relationship<Playlists>;
    };
  }

  /**
   * A resource object that represents a station.
   * https://developer.apple.com/documentation/applemusicapi/stations/
   */
  interface Stations extends Resource {
    type: "stations";
    attributes?: {
      artwork: Artwork;
      durationInMillis: number;
      editorialNotes: EditorialNotes;
      episodeNumber: number;
      contentRating?: ContentRating;
      isLive: boolean;
      name: string;
      playParams: PlayParameters;
      stationProviderName: string;
      url: string;
    };
  }

  /**
   * A resource object that represents a record label.
   * https://developer.apple.com/documentation/applemusicapi/recordlabels/
   */
  interface RecordLabels extends Resource {
    id: MusicItemID;
    type: "record-labels";
    attributes?: {
      artwork: Artwork;
      description: DescriptionAttribute;
      name: string;
      url: string;
    };
    views: {
      "latest-releases": View<Albums>;
      "top-releases": View<Albums>;
    };
  }

  /**
   * A resource object that represents an album.
   * https://developer.apple.com/documentation/applemusicapi/albums-uib
   */
  interface Albums extends Resource {
    type: "albums";
    attributes?: {
      artistName: string;
      artistUrl?: string;
      artwork: Artwork;
      editorialVideo?: any;
      audioTraits?: string[];
      contentRating?: ContentRating;
      Possible?: ContentRating;
      copyright?: string;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      isCompilation: boolean;
      isComplete: boolean;
      isMasteredForItunes: boolean;
      isSingle: boolean;
      name: string;
      playParams?: PlayParameters;
      recordLabel?: string;
      releaseDate?: string;
      trackCount: number;
      upc?: string;
      url: string;
    };
    relationships: {
      artists: Relationship<Artists>;
      genres: Relationship<Genres>;
      tracks: Relationship<MusicVideos | Songs>;
      library: Relationship<LibraryAlbums>;
      "record-labels": Relationship<RecordLabels>;
    };
    views: {
      "appears-on": View<Playlists>;
      "other-versions": View<Albums>;
      "related-albums": View<Albums>;
      "related-videos": View<MusicVideos>;
    };
  }

  /**
   * A resource object that represents a library album.
   * https://developer.apple.com/documentation/applemusicapi/libraryalbums/
   */
  interface LibraryAlbums extends Resource {
    type: "library-albums";
    attributes?: {
      artistName: string;
      artwork: Artwork;
      editorialVideo?: any;
      contentRating?: ContentRating;
      dateAdded?: string;
      name: string;
      playParams?: PlayParameters;
      releaseDate?: string;
      trackCount: number;
      genreNames: string[];
    };
    relationships: {
      artists: Relationship<Artists>;
      catalog?: Relationship<Albums>;
      tracks: Relationship<MusicVideos | Songs | LibrarySongs>;
    };
  }

  /**
   * A resource object that represents a library playlist.
   * https://developer.apple.com/documentation/applemusicapi/libraryplaylists/
   */
  interface LibraryPlaylists extends Resource {
    type: "library-playlists";
    attributes?: {
      isPublic?: boolean;
      canDelete?: boolean;
      artwork?: Artwork;
      editorialVideo?: any;
      canEdit: boolean;
      dateAdded?: string;
      description?: DescriptionAttribute;
      hasCatalog: boolean;
      name: string;
      playParams?: PlayParameters;
    };
    relationships?: {
      catalog?: Relationship<Playlists>;
      tracks: Relationship<MusicVideos | Songs | LibrarySongs>;
    };
  }

  /**
   * A resource object that represents an artist of an album where an artist can be one or more persons.
   * https://developer.apple.com/documentation/applemusicapi/artists-uip
   */
  interface Artists extends Resource {
    type: "artists";
    attributes?: {
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      name: string;
      url: string;
    };
    relationships: {
      albums: Relationship<Albums>;
      genres: Relationship<Genres>;
      "music-videos": Relationship<MusicVideos>;
      playlists: Relationship<Playlists>;
      station: Relationship<Stations>;
    };
    views: {
      "appears-on-albums": View<Albums>;
      "compilation-albums": {
        href?: string;
        next?: string;
        attributes: {
          title: string;
        };
        data: Albums[];
      };
      "featured-albums": View<Albums>;
      "featured-playlists": View<Playlists>;
      "full-albums": View<Albums>;
      "latest-release": View<Albums>;
      "live-albums": View<Albums>;
      "similar-artists": View<Artists>;
      singles: View<Albums>;
      "top-music-videos": View<MusicVideos>;
      "top-songs": View<Songs>;
    };
  }

  /**
   * A resource object that represents a playlist.
   * https://developer.apple.com/documentation/applemusicapi/playlists-ulf
   */
  interface Playlists extends Resource {
    id: MusicItemID;
    type: "playlists";
    attributes?: {
      artwork?: Artwork;
      editorialVideo?: any;
      audioTraits?: string[];
      supportsSing?: boolean;
      curatorName: string;
      description?: DescriptionAttribute;
      isChart: boolean;
      lastModifiedDate?: string;
      name: string;
      editorialNotes?: EditorialNotes;
      playlistType:
        | "editorial"
        | "external"
        | "personal-mix"
        | "replay"
        | "user-shared";
      url: string;
      playParams?: PlayParameters;
      trackTypes?: Array<"music-videos" | "songs">;
    };
    relationships: {
      curator: Relationship<Activities | AppleCurators | Curators>;
      library?: Relationship<LibraryPlaylists>;
      tracks: Relationship<MusicVideos | Songs>;
    };
    views?: {
      "featured-artists": View<Artists>;
      "more-by-curator": View<Playlists>;
    };
  }

  /**
   * A resource object that represents an activity curator.
   * https://developer.apple.com/documentation/applemusicapi/activities-ui5
   */
  interface Activities extends Resource {
    type: "activities";
    attributes?: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      name: string;
      url: string;
    };
    relationships: {
      playlists: Relationship<Playlists>;
    };
  }

  interface ResourceResponse {
    data: {
      data: Resource[];
      resources: {
        artists?: Record<string, MusicKit.Artists>;
        playlists?: Record<string, MusicKit.Playlists>;
        songs?: Record<string, MusicKit.Songs>;
        albums?: Record<string, MusicKit.Albums>;
        "library-playlists"?: Record<string, MusicKit.LibraryPlaylists>;
        "library-albums"?: Record<string, MusicKit.LibraryAlbums>;
        "library-songs"?: Record<string, MusicKit.LibrarySongs>;
      };
    };
  }

  /**
   * A resource object that represents recommended resources for a user calculated using their selected preferences.
   * https://developer.apple.com/documentation/applemusicapi/personalrecommendation
   */
  interface PersonalRecommendation extends Resource {
    type: "personal-recommendation";
    attributes?: {
      kind: "music-recommendations" | "recently-played" | "unknown";
      nextUpdateDate: string;
      hasSeeAll: boolean;
      reason: {
        stringForDisplay: string;
      };
      resourceTypes: string[];
      title: {
        stringForDisplay: string;
      };
    };
    relationships?: {
      contents: { data: Array<Resource> };
    };
  }
  interface PlayParameters {
    catalogId?: string;
    id: string;
    kind: string;
    isLibrary?: boolean;
    globalId?: string;
    versionHash?: string;
  }

  /**
   * An object that represents editorial notes.
   * https://developer.apple.com/documentation/musickit/editorialnotes
   */
  interface EditorialNotes {
    hashValue?: number;
    name?: string;
    short?: string;
    standard?: string;
    tagline?: string;
  }

  /**
   * An object that represents a preview for resources.
   * https://developer.apple.com/documentation/applemusicapi/preview
   */
  interface Preview {
    artwork?: Artwork;
    url: string;
    hlsUrl?: string;
  }

  /**
   * An object that represents a description attribute.
   * https://developer.apple.com/documentation/applemusicapi/descriptionattribute/
   */
  interface DescriptionAttribute {
    short?: string;
    standard?: string;
  }

  interface SearchResult<T> {
    data: T[];
    href?: string;
    next?: string;
  }

  interface SearchChartResult<T> {
    chart: string;
    data: T[];
    href?: string;
    name: string;
    next?: string;
  }

  type QueryParameters = Record<string, any>;

  type FetchOptions = {
    fetchOptions: { method: "POST" | "GET" | "PUT"; body?: any; headers?: any };
  };

  type APIResponseObject = {
    data: {
      data: Array<
        | Activities
        | Albums
        | AppleCurators
        | Artists
        | SearchChartResult<Resource>
        | Curators
        | Genres
        | MusicVideos
        | Playlists
        | SearchResult<Resource>
        | Songs
        | Stations
        | PersonalRecommendation
        | Resource
        | Storefronts
      >;
    };
  };

  class MusicKitAPI {
    /**Passthrough API Method signature
     * @param path The path to the Apple Music API endpoint, without a hostname, and including a leading slash /.
     * @param queryParameters An object with query parameters which will be appended to the request URL.
     *
     * The supported or expected query parameters will vary depending on the API endpoint you are requesting from.
     * @see {@link https://developer.apple.com/documentation/applemusicapi Apple Music API Docs} for reference.
     * ---
     * @param options An object with additional properties to control how requests are made.
     * @param fetchOptions An object that is passed as options to the underlying fetch() function.
     *
     * @returns An Object Promise with property 'data', which is the repsonse body from the API request to the Apple Music API.
     *
     * @see Apple Music API: [Handling Requests and Responses](https://developer.apple.com/documentation/applemusicapi/handling_requests_and_responses) for more information on Apple Music API responses.
     *
     *
     * Catalog Resources
     * ---
     * Activities
     * ---
     * Fetch one or more activites using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
     * ```
     * Activity
     * ---
     * Fetch an activity using its identifier.
     * @example
     * ```
     * const activityId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/activities/${activityId}`, queryParameters);
     * ```
     *
     * Albums
     * ---
     * Fetch one or more albums using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/albums`, queryParameters);
     * ```
     *
     * Album
     * ---
     * Fetch an album using its identifier.
     * @example
     * ```
     * const albumId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/albums/${albumId}`, queryParameters);
     * ```
     *
     * Apple Curators
     * ---
     * Fetch one or more apple curators using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/apple-curators`, queryParameters);
     * ```
     *
     * Apple Curator
     * ---
     * Fetch an apple curator using their identifier.
     * @example
     * ```
     * const curatorId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/apple-curators/${curatorId}`, queryParameters);
     * ```
     *
     * Artists
     * ---
     * Fetch one or more artists using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/artists`, queryParameters);
     * ```
     *
     * Artist
     * ---
     * Fetch an artist using their identifier.
     * @example
     * ```
     * const artistId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/artist/${artistId}`, queryParameters);
     * ```
     *
     * Charts
     * ---
     * Fetch one or more charts using their identifiers.
     * @example
     * ```
     * const queryParameters = { types: ['most-played'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/charts`, queryParameters);
     * ```
     *
     * Chart
     * ---
     * Fetch a chart using its identifier.
     * @example
     * ```
     * const chartId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/chart/${chartId}`, queryParameters);
     * ```
     *
     * Curators
     * ---
     * Fetch one or more curators using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/curators`, queryParameters);
     * ```
     *
     * Curator
     * ---
     * Fetch a curator using their identifier.
     * @example
     * ```
     * const curatorId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/curators/${curatorId}`, queryParameters);
     * ```
     *
     * Genres
     * ---
     * Fetch one or more genres using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/genres', queryParameters);
     * ```
     *
     * Genre
     * ---
     * Fetch a genre using its identifier.
     * @example
     * ```
     * const genreId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/genres/${genreId}`, queryParameters);
     * ```
     *
     * Music Videos
     * ---
     * Fetch one or more music videos using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/music-videos', queryParameters);
     * ```
     *
     * Music Video
     * ---
     * Fetch a music video using its identifier.
     * @example
     * ```
     * const musicVideoId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/music-videos/${musicVideoId}`, queryParameters);
     * ```
     *
     * Playlists
     * ---
     * Fetch one or more playlists using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/playlists', queryParameters);
     * ```
     *
     * Playlist
     * ---
     * Fetch a playlist using its identifier.
     * @example
     * ```
     * const playlistId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/playlists/${playlistId}`, queryParameters);
     * ```
     *
     * Search
     * ---
     * Search the catalog using a query.
     * @example
     * ```
     * const queryParameters = { term: 'Taylor Swift', types: ['albums', 'artists', 'songs'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/search', queryParameters);
     * ```
     *
     * Search Hints
     * ---
     * Fetch the search term results for a hint.
     * @example
     * ```
     * const queryParameters = { term: 'Taylor Swift', l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/search/hints', queryParameters);
     * ```
     *
     * Songs
     * ---
     * Fetch one or more songs using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/songs', queryParameters);
     * ```
     *
     * Song
     * ---
     * Fetch a song using its identifier.
     * @example
     * ```
     * const songId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/songs/${songId}`, queryParameters);
     * ```
     *
     * Stations
     * ---
     * Fetch one or more stations using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/stations', queryParameters);
     * ```
     *
     * Station
     * ---
     * Fetch a station using its identifier.
     * @example
     * ```
     * const stationId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/stations/${stationId}`, queryParameters);
     * ```
     *
     * Personalized content
     * ---
     *
     * Library
     * ---
     *
     * Adding
     * ---
     * Add a catalog resource to a user's library.
     * @example
     * ```
     * const playlistId = 'pl.23456789';
     *
     * const queryParameters = { ids: [playlistId], l: 'en-us' };
     *
     * await music.api.music('/v1/me/library', queryParameters, { fetchOptions: { method: 'POST' } });
     * ```
     *
     * Recommendations
     * ---
     *
     * All recommendations
     * ---
     * Fetch all recommendations.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/me/recommendations`, queryParameters);
     * ```
     *
     * Recommendation
     * ---
     * Fetch a recommendation using its identifier.
     * @example
     * ```
     * const recommendationId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/me/recommendations/${recommendationId}`, queryParameters);
     * ```
     *
     * Recent
     * ---
     *
     * Recently Played
     * ---
     * Fetch the recently played resources for the user.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music('/v1/me/recent/played', queryParameters);
     * ```
     *
     * History
     * ---
     *
     * Heavy Rotation
     * ---
     * Fetch the resources in heavy rotation for the user.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music('/v1/me/history/heavy-rotation', queryParameters);
     * ```
     *
     * Storefonts
     * ---
     *
     * Storefronts
     * ---
     * Fetch one or more storefronts using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/storefronts`, queryParameters);
     * ```
     *
     * Storefront
     * ---
     * Fetch a storefront using its identifier.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/storefronts/${storefrontId}`, queryParameters);
     * ``` */ /*Catalog Resources
     * ---
     * Activities
     * ---
     * Fetch one or more activites using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
     * ```
     * Activity
     * ---
     * Fetch an activity using its identifier.
     * @example
     * ```
     *
     * const activityId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/activities/${activityId}`, queryParameters);
     * ```
     *
     * Albums
     * ---
     * Fetch one or more albums using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/albums`, queryParameters);
     * ```
     *
     * Album
     * ---
     * Fetch an album using its identifier.
     * @example
     * ```
     * const albumId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/albums/${albumId}`, queryParameters);
     * ```
     *
     * Apple Curators
     * ---
     * Fetch one or more apple curators using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/apple-curators`, queryParameters);
     * ```
     *
     * Apple Curator
     * ---
     * Fetch an apple curator using their identifier.
     * @example
     * ```
     * const curatorId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/apple-curators/${curatorId}`, queryParameters);
     * ```
     *
     * Artists
     * ---
     * Fetch one or more artists using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/artists`, queryParameters);
     * ```
     *
     * Artist
     * ---
     * Fetch an artist using their identifier.
     * @example
     * ```
     * const artistId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/artist/${artistId}`, queryParameters);
     * ```
     *
     * Charts
     * ---
     * Fetch one or more charts using their identifiers.
     * @example
     * ```
     * const queryParameters = { types: ['most-played'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/charts`, queryParameters);
     * ```
     *
     * Chart
     * ---
     * Fetch a chart using its identifier.
     * @example
     * ```
     * const chartId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/chart/${chartId}`, queryParameters);
     * ```
     *
     * Curators
     * ---
     * Fetch one or more curators using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/curators`, queryParameters);
     * ```
     *
     * Curator
     * ---
     * Fetch a curator using their identifier.
     * @example
     * ```
     * const curatorId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/curators/${curatorId}`, queryParameters);
     * ```
     *
     * Genres
     * ---
     * Fetch one or more genres using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/genres', queryParameters);
     * ```
     *
     * Genre
     * ---
     * Fetch a genre using its identifier.
     * @example
     * ```
     * const genreId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/genres/${genreId}`, queryParameters);
     * ```
     *
     * Music Videos
     * ---
     * Fetch one or more music videos using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/music-videos', queryParameters);
     * ```
     *
     * Music Video
     * ---
     * Fetch a music video using its identifier.
     * @example
     * ```
     * const musicVideoId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/music-videos/${musicVideoId}`, queryParameters);
     * ```
     *
     * Playlists
     * ---
     * Fetch one or more playlists using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/playlists', queryParameters);
     * ```
     *
     * Playlist
     * ---
     * Fetch a playlist using its identifier.
     * @example
     * ```
     * const playlistId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/playlists/${playlistId}`, queryParameters);
     * ```
     *
     * Search
     * ---
     * Search the catalog using a query.
     * @example
     * ```
     * const queryParameters = { term: 'Taylor Swift', types: ['albums', 'artists', 'songs'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/search', queryParameters);
     * ```
     *
     * Search Hints
     * ---
     * Fetch the search term results for a hint.
     * @example
     * ```
     * const queryParameters = { term: 'Taylor Swift', l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/search/hints', queryParameters);
     * ```
     *
     * Songs
     * ---
     * Fetch one or more songs using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/songs', queryParameters);
     * ```
     *
     * Song
     * ---
     * Fetch a song using its identifier.
     * @example
     * ```
     * const songId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/songs/${songId}`, queryParameters);
     * ```
     *
     * Stations
     * ---
     * Fetch one or more stations using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music('/v1/catalog/{{storefrontId}}/stations', queryParameters);
     * ```
     *
     * Station
     * ---
     * Fetch a station using its identifier.
     * @example
     * ```
     * const stationId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/catalog/{{storefrontId}}/stations/${stationId}`, queryParameters);
     * ```
     *
     * Personalized content
     * ---
     *
     * Library
     * ---
     *
     * Adding
     * ---
     * Add a catalog resource to a user's library.
     * @example
     * ```
     * const playlistId = 'pl.23456789';
     *
     * const queryParameters = { ids: [playlistId], l: 'en-us' };
     *
     * await music.api.music('/v1/me/library', queryParameters, { fetchOptions: { method: 'POST' } });
     * ```
     *
     * Recommendations
     * ---
     *
     * All recommendations
     * ---
     * Fetch all recommendations.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/me/recommendations`, queryParameters);
     * ```
     *
     * Recommendation
     * ---
     * Fetch a recommendation using its identifier.
     * @example
     * ```
     * const recommendationId = '123456789';
     *
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/me/recommendations/${recommendationId}`, queryParameters);
     * ```
     *
     * Recent
     * ---
     *
     * Recently Played
     * ---
     * Fetch the recently played resources for the user.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music('/v1/me/recent/played', queryParameters);
     * ```
     *
     * History
     * ---
     *
     * Heavy Rotation
     * ---
     * Fetch the resources in heavy rotation for the user.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music('/v1/me/history/heavy-rotation', queryParameters);
     * ```
     *
     * Storefonts
     * ---
     *
     * Storefronts
     * ---
     * Fetch one or more storefronts using their identifiers.
     * @example
     * ```
     * const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
     *
     * await music.api.music(`/v1/storefronts`, queryParameters);
     * ```
     *
     * Storefront
     * ---
     * Fetch a storefront using its identifier.
     * @example
     * ```
     * const queryParameters = { l: 'en-us' };
     *
     * await music.api.music(`/v1/storefronts/${storefrontId}`, queryParameters);
     * ``` */
    v3: {
      music: (
        path: string,
        queryParameters?: QueryParameters,
        options?: FetchOptions
      ) => Promise<APIResponseObject>;
    };
  }
}
