/**Use the MusicKit namespace to configure MusicKit on the Web and access the singleton instance.
 *
 * It is also a global variable on the window object, and a namespace for other utils and enums.
 * @see MusicKit Docs: [Configuring MusicKit on the Web](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?path=/story/get-started--page#configuring-musickit-on-the-web)
 * @see {@link MusicKitInstance} for the configured instance.*/
declare namespace MusicKit {
  /**The MusicKitConfiguration object is passed to the MusicKit.configure() method above and supports the following properties. */

  /**A set of configuration parameters for your app during the authorization flow.
   * @see MusicKit Docs: [Authorization Flow](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?path=/story/user-authorization--page) */
  interface App {
    /**The name of your application during the authorization flow. */
    name: string;
    /**Current build number or version of your app. */
    build?: string;
    /**A URL to the image used to represent your application during the authorization flow.
     *
     * Ideally this image has a square aspect ratio and is 152px by 152px (2x image content to support Retina Displays).
     *
     * Display dimensions are 76px by 76px. */
    icon?: string;
    version?: string;
  }

  /**The MusicKitConfiguration object is passed to the MusicKit.configure() method above and supports the following properties. */
  interface MusicKitConfiguration {
    /**A developer token to use with MusicKit JS. */
    developerToken: string;
    /**A set of configuration parameters for your app.
     * @see {@link App} */
    app: App;
    /**Can be used to target a bit rate for playback. Otherwise MusicKit will do its best to determine a proper bit rate.
     *
     * Can be changed later on the instance.
     * @see {@link MusicKitInstance.bitrate} */
    bitrate?: PlaybackBitrate;
    /**This is the value used for the {{storefrontId}} token in the path argument of the Passthrough API method, which helps create reusable URL
     * templates by abstracting the storefront.
     *
     * If not set, the storefrontId will use the authenticated user’s storefront, which is likely ideal in most situations.
     * @see {@link MusicKitInstance.storefrontId}*/
    storefrontId?: string;
    sourceType?: number;
    suppressErrorDialog?: boolean;
  }

  // Methods

  /**Configures a MusicKit instance.
   * @param config A {@link MusicKitConfiguration MusicKitConfiguration} object.
   * @returns A Promise that resolves with the configured {@link MusicKitInstance}. */
  function configure(config: MusicKitConfiguration): Promise<MusicKitInstance>;

  /**Access the configured MusicKit Instance singleton.
   * @returns the singleton {@link MusicKitInstance}, or undefined if the instance has not been configured.
   *
   * NOTE: {@link MusicKit.configure()} must have been called first for the singleton instance to have been created. Otherwise this will return undefined. */
  function getInstance(): MusicKitInstance;

  /**Takes an artwork object, which is common in Apple Music API Responses.
   * @param artwork The Artwork object.
   * @param width The desired artwork width*.
   * @param height The desired artwork height*.
   * @returns A URL that can be used as the source for an image or picture tag, etc.
   * @see Apple Music API: [Artwork Object](https://developer.apple.com/documentation/applemusicapi/artwork)
   * @see MusicKit Docs: [MusicKitAPI and the Passthrough API Method](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?id=reference-javascript-api--page) */
  function formatArtworkURL(
    artwork: Artwork,
    width?: number,
    height?: number
  ): string;

  // Enums

  /**The playback bit rate of the music player.
   *
   * Used in the {@link configure()} method, or set directly on the {@link MusicKitInstance} as the bitrate property. */
  enum PlaybackBitrate {
    /**The bit rate is 256 kbps. */
    HIGH = 256,
    /**The bit rate is 64 kbps. */
    STANDARD = 64,
  }

  /**The playback states of the music player. */
  enum PlaybackStates {
    /**This value indicates that the player has not attempted to start playback. */
    none = 0,
    /**This value indicates that loading of the MediaItem has begun. */
    loading = 1,
    /**This value indicates that the player is currently playing media. */
    playing = 2,
    /**This value indicates that playback has been paused. */
    paused = 3,
    /**This value indicates that plaback has been stopped. */
    stopped = 4,
    /**This value indicates that playback of the MediaItem has ended. */
    ended = 5,
    /**This value indicates that the player has started a seek operation. */
    seeking = 6,
    /**This value indicates that playback is delayed pending the completion of another operation. */
    waiting = 7,
    /**This value indicates that the player is trying to fetch media data but data has not been received yet. */
    stalled = 8,
    /**This value indicates that playback of all MediaItems in the queue has ended. */
    completed = 9,
  }

  /**Possible values for the repeat mode for the music player. */
  enum PlayerRepeatMode {
    /**The current queue will be repeated. */
    all = 'all',
    /**No repeat mode specified. */
    none = 'none',
    /**The current MediaItem will be repeated. */
    one = 'one',
  }

  /**Possible values for the shuffle mode for the music player. */
  enum PlayerShuffleMode {
    /**The queue will not be shuffled. */
    off = 0,
    /**The queue will shuffle songs. */
    songs = 1,
  }
}
