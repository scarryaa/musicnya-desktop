declare namespace MusicKit {
  interface SeekSeconds {
    BACK: number;
    FORWARD: number;
  }

  /**he MusicKit instance is a singleton, meaning there is only one instance for the runtime of your application.
   *
   * It can be accessed as the resolved value of {@link MusicKit.configure()} or the return value of {@link MusicKit.getInstance()} after configuration. */
  export class MusicKitInstance {
    /**Used to call the Apple Music API.
     * @see Apple Music API: {@link [Accessing Music Content](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?path=/story/accessing-music-content--page)} */
    api: MusicKitAPI;
    /**The bit rate for the media player. The bit rate is set automatically based on the client, but can be overridden by the app to a value from the enum MusicKit.PlaybackBitrate.
     *
     * Setting this property will affect the item played next, not the currently playing item.
     *
     * This property does not necessarily represent the actual bit rate of the item being played, only the target bit rate when the player selects the stream to play. */
    bitrate: PlaybackBitrate;
    /**The duration of the {@link nowPlayingItem}, in seconds. */
    readonly currentPlaybackDuration: number;
    /**Progress percentage between 0 and 1 indicating the current play head position for the nowPlayingItem.
     *
     * Useful for showing a playback progress bar UI, for instance. */
    readonly currentPlaybackProgress: number;
    /**The current position of the play head for the nowPlayingItem, in seconds. */
    readonly currentPlaybackTime: number;
    /**The current remaining playback time for the {@link nowPlayingItem}, in seconds. */
    readonly currentPlaybackTimeRemaining: number;
    /**This is set to true after the user successfully signs in and authorizes the application via the authorize() method,
     * or upon configuring the MusicKit instance if the user had previously authorized your application. */
    readonly isAuthorized: boolean;
    /**Indicates whether the player is in the playing state. */
    readonly isPlaying: boolean;
    /**This is the {@link MediaItem} that is currently playing from the {@link Queue}.
     *
     * This property will change when playback of a Queue starts, but will not unset on pause.
     *
     * It will change to the next item in the Queue once that item starts playing. */
    readonly nowPlayingItem: MediaItem | undefined;
    /**The index of the {@link nowPlayingItem} in the current playback {@link Queue}. */
    readonly nowPlayingItemIndex: number;
    /**The speed of playback, which is set directly on the HTMLMediaElement as the HTMLMediaElement.playbackRate property.
     *
     * The default rate is 1.0, but this can be set to a value higher or lower to control the speed of playback.
     *
     * Different browsers will have different upper and lower bounds for this value. */
    playbackRate: number;
    /**The current playback state of the media player. See {@link PlaybackStates} for more information and the possible values. */
    readonly playbackState: PlaybackStates;
    /**When a user with a valid Apple Music subscription authorizes your app, MusicKit will allow full playback of content from the Apple Music catalog.
     *
     * If the app does not have user authorization, then playback is restricted to non-DRM preview assets, which are snippets of the full media.
     *
     * You can set this property to true to restrict MusicKit to playing only the preview assets, even when full playback is available.
     *
     * Setting this to false will not force full playback, but will instead return to the default behavior of determining what asset to play based
     * on the user’s authorization and Apple Music Subscription status. */
    previewOnly: boolean;
    /**The current playback queue of the music player. */
    readonly queue: Queue;
    /**Indicates whether the current playback {@link Queue} is empty. */
    queueIsEmpty: number;
    /**Set this to an Enum value from {@link PlayerRepeatMode} to control the repeat behavior during playback. */
    repeatMode: PlayerRepeatMode;
    /**While playing a MediaItem, seekSeconds will be an Object with properties BACK and FORWARD,
     * which represent the number of seconds that the play head will be moved backwards or forwards when calling {@link seekBackward} or {@link seekForward}, respectively. */
    readonly seekSeconds: SeekSeconds | undefined;
    /** The shuffle mode of the player.
     *
     * Set this to an Enum value from {@link PlayerShuffleMode} to control the shuffle behavior during playback.
     *
     * Setting this property will not change the {@link nowPlayingItem}. If there is a nowPlayingItem when setting shuffleMode it will
     * always be the first item in the shuffled queue. */
    shuffleMode: PlayerShuffleMode;
    /**@deprecated This property is deprecated, use {@link shuffleMode} instead. */
    shuffle: boolean;
    /**This is the id of the authorized user’s storefront, if applicable. It defaults to 'us'. */
    readonly storefrontCountryCode: string;
    /**This is the id of the configured storefront for the instance of MusicKit.
     * It can be set explicitly when calling {@link MusicKit.configure()},
     * or after configuration by calling {@link changeUserStorefront}.
     * It will default to the {@link storefrontCountryCode}.
     *
     * This is also the value used for the {{storefrontId}} token in the path argument of the Passthrough API method, which helps create
     * reusable URL templates by abstracting the storefront.
     * @see MusicKit Docs: [Passthrough API](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?path=/story/reference-javascript-api--page) */
    readonly storefrontId: string;
    /**If creating a custom video player, you can set this property to a DOM Element of type {@link HTMLVideoElement}, which is the element type of a <video> tag.
     * MusicKit will then use that element for video playback, for instance Music Videos.
     *
     * Using our Music Video Player Web Component, this will be configured for you automatically.
     * Otherwise, you will need to add a <video> element to your page and provide a reference to it as the videoContainerElement
     * property in order to play any video-format Media Items. */
    readonly videoContainerElement: any | undefined;
    /**The volume of audio playback, which is set directly on the {@link HTMLMediaElement} as the {@link HTMLMediaElement.volume} property.
     *
     * This value ranges between 0, which would be muting the audio, and 1, which would be the loudest possible. */
    volume: number;

    // Methods

    /**Listen to an {@link  MusicKit.Events Event} on the MusicKit Instance.
     * @param name The name of the event.
     * @param callback The function that is called when an event is published. The arguments vary per event, and the function returns void.
     * @param options An optional options object. defaults to false.
     * If 'once' is true, will automatically remove the event listener after it has fired once.
     * When false, callback will continue to be called each time the event is published until {@link removeEventListener()} is called with the appropriate arguments.
     * @returns void.
     * @see {@link MusicKit.Events} for more info.*/
    addEventListener(
      name: string,
      callback: Function,
      options?: { once: boolean }
    ): void;

    /**Initiates the authorization flow.
     * @returns a Promise that resolves with a string representing the user. If authorization fails or is canceled by the user, the resolved value is undefined.
     * @see MusicKit Docs: [User Authorization](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?path=/docs/user-authorization--page) */
    authorize(): Promise<string | void>;

    /**Begins playing the {@link MediaItem} at the specified index in the {@link Queue} immediately.
     *
     * Note: This method will trigger playback, even if the player is currently paused.
     * This could result in an error if the user has not interacted with the player yet, as most browsers prevent audio playback without user interaction.
     * @param index The index position of the {@link MediaItem} in the {@link Queue} to begin playing.
     * @returns a void Promise. */
    changeToMediaAtIndex(index: number): Promise<void>;

    /**Begins playing a specific {@link MediaItem} in the {@link Queue} immediately.
     *
     * Note: This method will trigger playback, even if the player is currently paused.
     * This could result in an error if the user has not interacted with the player yet, as most browsers prevent audio playback without user interaction.
     * @param descriptor A {@link MediaItem} instance or the {@link id} of a specific item in the {@link Queue}.
     * @returns a void Promise.*/
    changeToMediaItem(descriptor: MediaItem | string): Promise<void>;

    /**Changes the user's storefront.
     * @param storefrontId The id of the storefront to use as the {{storefrontId}} value in the path parameter of the
     * Passthrough API.
     * @returns a void Promise.
     * @see MusicKit Docs: [Passthrough API](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?id=reference-javascript-api--page) */
    changeUserStorefront(storefrontId: string): Promise<void>;

    /**Clears the queue of all {@link MediaItem MediaItems}. Does not stop playback or clear the {@link nowPlayingItem}.
     * @returns an empty {@link Queue}, which is also set as the queue property of the {@link MusicKitInstance}. */
    clearQueue(): Promise<Queue>;

    /**Cross-browser method to close a full-screen element, when applicable.
     * @returns a void Promise. */
    exitFullscreen(): Promise<void>;

    /**Sets the {@link volume} to 0, storing the previous value for use with {@link unmute()} later, if necessary.
     * @returns void. */
    mute(): void;

    /**Pauses playback of the {@link nowPlayingItem}.
     * @returns void. */
    pause(): void;

    /**Initiates playback of the {@link nowPlayingItem}.
     *
     * Note: This could result in an error if the user has not interacted with the player yet, as most browsers prevent audio playback without user interaction.
     * @returns void. */
    play(): Promise<void>;

    /**Inserts the {@link MediaItem MediaItem(s)} defined by {@link QueueOptions} at the position indicated in the current {@link Queue}.
     * @param position The index position in the Queue to inser the new MediaItem(s) at. Position 0 is the first item in the Queue.
     * @param options The {@link QueueOptions} object to set the Queue with.
     * @returns a Promise that resolves with the updated Queue, or void if playback is not supported. */
    playAt(position: number, options: QueueOptions): Promise<Queue | void>;

    /**Inserts the {@link MediaItem MediaItem(s)} defined by {@link QueueOptions} after the last MediaItem in the current {@link Queue}.
     * @param options The {@link QueueOptions} object to set the Queue with.
     * @returns a Promise that resolves with the updated Queue, or void if playback is not supported. */
    playLater(options: QueueOptions): Promise<Queue | void>;

    /**Inserts the {@link MediaItem MediaItem(s)} defined by {@link QueueOptions} immediately after the {@link nowPlayingItem} in the current {@link Queue}.
     * @param options The {@link QueueOptions} object to set the Queue with.
     * @param clear An optional parameter that, if true, clears out the remaining Queue items. Defaults to false.
     * @returns Returns a Promise that resolves with the updated Queue, or void if playback is not supported. */
    playNext(options: QueueOptions, clear?: boolean): Promise<Queue | void>;

    /**Remove an event listener previously configured on the {@link MusicKitInstance} via {@link MusicKitInstance.addEventListener addEventListener()}.
     * @param name The {@link MusicKit.Events Event} to stop listening to.
     * @param callback The exact function reference passed when originally calling {@link MusicKitInstance.addEventListener addEventListener()} for the same event name.
     * @returns void. */
    removeEventListener(name: string, callback: Function): void;

    /**Cross-browser method to take an element full-screen, where supported. Useful for creating custom controller UI.
     * @param element The DOM Node that you intend to make fullscreen.
     * @returns a void Promise. */
    requestFullscreen(element: any): Promise<void>;

    /**Seeks the current play head backwards by a predetermined number of a seconds.
     * The number of seconds can be determined for the current track by referencing {@link MusicKitInstance.seekSeconds seekSeconds.BACK}.
     * @returns a void Promise. */
    seekBackward(): Promise<void>;

    /**Seeks the current play head forward by a predetermined number of a seconds.
     * The number of seconds can be determined for the current track by referencing {@link MusicKitInstance.seekSeconds seekSeconds.FORWARD}.
     * @returns a void Promise. */
    seekForward(): Promise<void>;

    /**Sets the play head to a specified time within the {@link nowPlayingItem}.
     * @param time The time, in seconds, to move the play head for the nowPlayingItem.
     * @returns a void Promise. */
    seekToTime(time: number): Promise<void>;

    /**Sets the current playback {@link Queue} to an Apple Music catalog resource or list of songs.
     * @param options The {@link QueueOptions} object to set the Queue with.
     * @returns a Promise that resolves with the updated Queue, or void if playback is not supported. */
    setQueue(options: QueueOptions): Promise<Queue | void>;

    /**Starts playback of the next item in the playback {@link Queue}.
     * @returns a void Promise. */
    skipToNextItem(): Promise<void>;

    /**Starts playback of the previous item in the playback {@link Queue}.
     * @returns a void Promise. */
    skipToPreviousItem(): Promise<void>;

    /**Stops the currently playing item.
     * @returns a void Promise. */
    stop(): Promise<void>;

    /** Unauthorizes the user from using your application. It will invalidate the Music User Token.
     * @returns a void Promise. */
    unauthorize(): Promise<void>;

    /**Unmute playback volume, resetting it to the value it was at before muting.
     * @returns a void Promise. */
    unmute(): Promise<void>;
  }
}
