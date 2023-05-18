declare namespace MusicKit {
  /**An enum containing events for a {@link MusicKitinstance}.*/
  interface Events {
    /**A notification indicating an audio track has been added to the media element.
     *
     * Consumers should access the audioTracks field on the MusicKit instance. */
    audioTrackAdded: unknown;
    /**A notification indicating the playing audio track has changed.
     *
     * Consumers should access the audioTracks field on the MusicKit instance to determine the currently enabled track. */
    audioTrackChanged: unknown;
    /**A notification indicating an audio track has been removed from the media element.
     *
     * Consumers should access the audioTracks field on the MusicKit instance. */
    audioTrackRemoved: unknown;
    /**A notification name indicating a change in the authorization status. */
    authorizationStatusDidChange: unknown;
    /**A notification name indicating an upcoming change in the authorization status. */
    authorizationStatusWillChange: unknown;
    /**A notification name for indicating the current buffer progress changed. */
    bufferedProgressDidChange: unknown;
    /**A notification indicating that the capabilities available for playback controls have changed. */
    capabilitiesChanged: unknown;
    /**A notification that is fired when a MusicKit on the Web instance has been configured. */
    configured: unknown;
    /**A notification for indicating that media playback has fallen back to preview mode due to an inability to configure DRM for the current item in the current environment. */
    drmUnsupported: unknown;
    /**A notification name indicating a user is eligible for a subscribe view. */
    eligibleForSubscribeView: unknown;
    /**A notification indicating the text track to use for forced subtitles has changed. */
    forcedTextTrackChanged: unknown;
    /**A notification name indicating MusicKit on the Web is loaded. */
    loaded: unknown;
    /**A notification name indicating the player has obtained enough data for playback to start. */
    mediaCanPlay: unknown;
    /**A notification indicating a new media element was created. The element is passed as the event data. */
    mediaElementCreated: HTMLMediaElement;
    /**A notification for indicating that a MediaItem's state has changed. */
    mediaItemStateDidChange: unknown;
    /**A notification for indicating that a MediaItem's state is about to be changed. */
    mediaItemStateWillChange: unknown;
    /**A notification for indicating that the player has thrown an MKError during playback. */
    mediaPlaybackError: unknown;
    /**A notification indicating that the skip intro period has been reached. */
    /**A notification indicating that a Pre or Post Roll has been entered. */
    mediaSkipAvailable: unknown;
    /**A notification indicating the the next item should be shown. */
    mediaUpNext: unknown;
    /**A notification name indicating the MediaItem's metadata has finished loading. */
    metadataDidChange: unknown;
    /**A notification for indicating the currently-playing MediaItem is about to be changed. */
    nowPlayingItemWillChange: { item: MediaItem };
    /**A notification for indicating the currently-playing MediaItem has changed. */
    nowPlayingItemDidChange: { item: MediaItem };
    /**A notification indicating the playback bit rate has changed. */
    playbackBitrateDidChange: unknown;
    /**A notification name indiciating the current playback duration changed. */
    playbackDurationDidChange: unknown;
    /**A notification name indicating the current playback progress changed. */
    playbackProgressDidChange: unknown;
    /**A notification for indicating the current playback rate changed. */
    playbackRateDidChange: unknown;
    /**A notification indicating the playback state is about to be changed. */
    playbackStateWillChange: {
      oldState: PlaybackStates;
      newState: PlaybackStates;
    };
    /**A notification indicating the playback state has changed. */
    playbackStateDidChange: {
      oldState: PlaybackStates;
      newState: PlaybackStates;
    };
    /**A notification indicating that a playback target's availability has changed . */
    playbackTargetAvailableDidChange: unknown;
    /**A notification name indicating the current playback time has changed. */
    playbackTimeDidChange: unknown;
    /**A notification name indicating the player volume has changed. */
    playbackVolumeDidChange: unknown;
    /**A notification for indicating the type of player changed; e.g. from music to video. */
    playerTypeDidChange: unknown;
    /**A notification name indicating the playback has started in another context on your domain, and the current player has stopped playback. */
    primaryPlayerDidChange: unknown;
    /**A notification indicating the queue data has been loaded and the queue is ready to play. */
    queueIsReady: unknown;
    /**A notification name indicating that the items in the current playback queue have changed. */
    queueItemsDidChange: unknown;
    /**A notification name indicating that the current queue position (now playing item) has changed. */
    queuePositionDidChange: unknown;
    /**A notification indicating that the current controller shuffle mode has changed. */
    shuffleModeDidChange: unknown;
    /**A notification indicating that the current queue repeat mode has changed. */
    repeatModeDidChange: unknown;
    /**A notification name indicating a change in the storefront country code. */
    storefrontCountryCodeDidChange: unknown;
    /**A notification for indicating the devices inferred storefront identifier changed. */
    storefrontIdentifierDidChange: unknown;
    /**A notification indicating a text track has been added to the media element. */
    textTrackAdded: unknown;
    /**A notification indicating the playing text track changed. */
    textTrackChanged: unknown;
    /**A notification indicating a text track has been removed from the media element. */
    textTrackRemoved: unknown;
    /**A notification indicating the media element has reached a timed metadata event. */
    timedMetadataDidChange: unknown;
  }
}
