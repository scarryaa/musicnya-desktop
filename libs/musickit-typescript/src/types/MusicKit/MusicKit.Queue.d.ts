declare namespace MusicKit {
  type Descriptor = MediaItem | string;

  class QueueOptions {
    album?: string;
    items?: Array<Descriptor>;
    playlist?: string;
    song?: string;
    songs?: Array<string>;
    station?: string;
    startPlaying?: boolean;
    startPosition?: number;
    url?: string;
  }

  /**The Queue represents an ordered list of {@link MediaItems} to play, and a pointer to the currently playing item, when applicable.
   *
   * You can access the current queue in {@link MusicKit} with the {@link MusicKitInstance.queue} property, or as the return value of {@link MusicKitInstance.setQueue()}. */
  interface Queue {
    /**The item at the {@link Queue.position} index within the {@link Queue.items} array.
     * This is the nowPlayingItem when the {@link Queue} is the current queue for the {@link MusicKitInstance}. */
    currentItem: MediaItem;
    /**If the length of the queue is 0. */
    isEmpty: boolean;
    /**An array of all the {@link MediaItem MediaItems} in the queue. */
    items: Array<MediaItem>;
    /**The number of items in the {@link Queue}. */
    length: number;
    /**This is the next item after the {@link currentItem} within the {@link Queue}. */
    nextPlayableItem: MediaItem;
    /**The index position of the {@link nowPlayingItem} in the {@link Queue.items} Array. */
    position: number;
    /**This is the previous item before the {@link currentItem} within the {@link Queue}. */
    previousPlayableItem: MediaItem;
    /**Queue Options are used to instruct {@link MusicKit} to generate or ammend a {@link Queue}, for example using the {@link MusicKitInstance.setQueue()} method.
     *
     *
     * This object serves two main purposes:
     *
     * Content Options:
     * ---
     * Indicating media to add to the queue or generate a new queue from.
     *
     * Playback Options:
     * ---
     * Indicating options for how that content is intended to play.
     *
     * All of these properties exist within the same Object passed as {@link QueueOptions}, but are documented separately below for clarity.
     *
     * ---
     * Setting Queue Content by IDs
     * ---
     * The most common way to select {@link MediaItem MediaItems} to add to or replace a {@link Queue} with is via the ID(s) of
     * the content from the Apple Music catalog.
     *
     * MusicKit is not able to determine the type of content from the ID alone,
     * so the property name indicates the type and the value represents the ID(s) themselves.
     *
     * ---
     *
     * The following property names can be used to select content (singlular from / plural form):
     *
     * album / albums
     *
     * musicVideo / musicVideos
     *
     * playlist / playlists
     *
     * song / songs
     *
     * @example
     * ```
     * const music = MusicKit.getInstance();
     *
     * // Create a new queue from a playlist
     *
     * await music.setQueue({ playlist: 'pl.d133de76fb4f4ccf98846231899874c0', startPlaying: true });
     *
     * // Update the current queue to add a song after the currently playing one
     *
     * await music.playNext({ song: '1561837008' });
     * ```
     *
     * Setting Queue Content by URL
     * ---
     * As an abstracted way to play a media item or container (such as an album or playlist)
     * without first needing to know the type, you can provide a URL reference, which is commonly found under the
     * attributes of the Apple Music API response objects.
     *
     * @example
     * ```
     * const music = MusicKit.getInstance();
     *
     * const playlistURL = 'https://music.apple.com/us/playlist/pl.d133de76fb4f4ccf98846231899874c0';
     *
     * await music.setQueue({ url: playlistURL });
     * ```
     *
     * @see MusicKit Docs: [Passthrough API](https://js-cdn.music.apple.com/musickit/v3/docs/iframe.html?id=reference-javascript-api--page) for more info. */
    QueueOptions: QueueOptions;
    /**Updates the {@link repeatMode} on the {@link MusicKitInstance} when setting the new {@link Queue}.
     * If not set, repeatMode on the MusicKit Instance will not be changed.
     *
     * Defaults to undefined.*/
    repeatMode: PlayerRepeatMode | undefined;
    /**Whether or not to also start playback when the {@link Queue} is updated.
     *
     * If not set to true when {@link MusicKitInstance.setQueue()} is called, current playback will stop, if applicable.
     *
     * Defaults to false.*/
    startPlaying: boolean;
    /**The number of seconds to seek to in the current queue item after it is created. */
    startTime: number;
  }
}
