export namespace MusicKitConst {
    export enum PlayerRepeatMode {
        'All' = 'all',
        'None' = 'none',
        'One' = 'one'
      }

      export enum Events {
        AuthorizationStatusDidChange = "authorizationStatusDidChange", 
        AuthorizationStatusWillChange = "authorizationStatusWillChange", 
        EligibleForSubscribeView = "eligibleForSubscribeView", 
        Loaded = "loaded", 
        MediaCanPlay = "mediaCanPlay", 
        MediaItemDidChange = "mediaItemDidChange", 
        MediaItemWillChange = "mediaItemWillChange", 
        MediaPlaybackError = "mediaPlaybackError", 
        MetadataDidChange = "metadataDidChange", 
        PlaybackBitrateDidChange = "playbackBitrateDidChange", 
        PlaybackDurationDidChange = "playbackDurationDidChange", 
        PlaybackProgressDidChange = "playbackProgressDidChange", 
        PlaybackStateDidChange = "playbackStateDidChange", 
        PlaybackStateWillChange = "playbackStateWillChange", 
        PlaybackTargetAvailableDidChange = "playbackTargetAvailableDidChange", 
        PlaybackTimeDidChange = "playbackTimeDidChange", 
        PlaybackVolumeDidChange = "playbackVolumeDidChange", 
        PrimaryPlayerDidChange = "primaryPlayerDidChange", 
        QueueItemsDidChange = "queueItemsDidChange", 
        QueuePositionDidChange = "queuePositionDidChange", 
        StorefrontCountryCodeDidChange = "storefrontCountryCodeDidChange", 
        StorefrontIdentifierDidChange = "storefrontIdentifierDidChange", 
        UserTokenDidChange = "userTokenDidChange" 
    }

    export enum PlaybackStates {
        Completed = "completed",
        Ended = "ended",
        Loading = "loading",
        None = "none",
        Paused = "paused",
        Playing = "playing",
        Seeking = "seeking",
        Stalled = "stalled",
        Stopped = "stopped",
        Waiting = "waiting"
    }
}