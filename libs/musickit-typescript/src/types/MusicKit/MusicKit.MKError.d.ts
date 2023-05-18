declare namespace MusicKit {

    /**{@link MusicKit} on the Web uses the following error codes to describe errors that may occur when using MusicKit, including server and local errors. */
    class MKError extends Error {

        /**The errorCode for the error. */
        errorCode: string;
        /**A description of the error that occurred. */
        description?: string | undefined;

        /**Error code indicating that you don't have permission to access the endpoint, {@link MediaItem}, or content. */
        static ACCESS_DENIED: string;
        /**Error code indicating that action blocked due to age verification. */
        static AGE_VERIFICATION: string;
        /**Error code indicating the authorization was rejected. */
        static AUTHORIZATION_ERROR: string;
        /**Error code indicating a {@link MusicKit} on the Web configuration error. */
        static CONFIGURATION_ERROR: string;
        /**Error code indicating the content has an equivalent for the user's storefront. */
        static CONTENT_EQUIVALENT: string;
        /**Error code indicating you don't have permission to access this content, due to content restrictions. */
        static CONTENT_RESTRICTED: string;
        /**Error code indicating the content requested is not available. */
        static CONTENT_UNAVAILABLE: string;
        /**Error code indicating the content is not supported on the current platform. */
        static CONTENT_UNSUPPORTED: string;
        /**Error code indicating you have reached your device limit. */
        static DEVICE_LIMIT: string;
        /**Error code indicating that an error internal to media-api occurred. */
        static INTERNAL_ERROR: string;
        /**Error code indicating the parameters provided for this method are invalid. */
        static INVALID_ARGUMENTS: string;
        /**Error code indicating that the VM certificate could not be applied. */
        static MEDIA_CERTIFICATE: string;
        /**Error code indicating that the {@link MediaItem} descriptor is invalid. */
        static MEDIA_DESCRIPTOR: string;
        /**Error code indicating that a DRM key could not be generated. */
        static MEDIA_KEY: string;
        /**Error code indicating a DRM license error. */
        static MEDIA_LICENSE: string;
        /**Error code indicating a media playback error. */
        static MEDIA_PLAYBACK: string;
        /**Error code indicating that an EME session could not be created. */
        static MEDIA_SESSION: string;
        /**Error code indicating a network error. */
        static NETWORK_ERROR: string;
        /**Error code indicating that the resource was not found. */
        static NOT_FOUND: string;
        /**Error code indicating that content cannot be played due to HDCP error. */
        static OUTPUT_RESTRICTED: string;
        /**Error code indicating that the error encountered while parsing results. */
        static PARSE_ERROR: string;
        /**Error code indicating that the browser supports Playready DRM but not CBCS encryption. */
        static PLAYREADY_CBC_ENCRYPTION_ERROR: string;
        /**Error code indicating that you have exceeded the Apple Music API quota. */
        static QUOTA_EXCEEDED: string;
        /**Error code indicating that a request error has occured. */
        static REQUEST_ERROR: string;
        /**Error code indicating that a server error has occured. */
        static SERVER_ERROR: string;
        /**Error code indicating the {@link MusicKit} service could not be reached. */
        static SERVICE_UNAVAILABLE: string;
        /**Error code indicating that a stream contention - Upsell error has occured. */
        static STREAM_UPSELL: string;
        /**Error code indicating that the user's Apple Music subscription has expired. */
        static SUBSCRIPTION_ERROR: string;
        /**Error code indicating that the user token has expired. */
        static TOKEN_EXPIRED: string;
        /**Error code indicating that the request wasn’t accepted because its authorization is missing or invalid due to an issue with the developer token. */
        static UNAUTHORIZED_ERROR: string;
        /**Error code indicating an unknown error. */
        static UNKNOWN_ERROR: string;
        /**Error code indicating that the operation is not supported. */
        static UNSUPPORTED_ERROR: string;
        /**Error code indicating that playback of media content requires user interaction first and cannot be automatically started on page load. 
         * 
         * For more information, see {@link HTMLMediaElement.play()}. */
        static USER_INTERACTION_REQUIRED: string;
        /**Error code indicating that the browser's Widevine CDM implementation is old and insecure, and Irdeto won't serve a license for it. */
        static WIDEVINE_CDM_EXPIRED: string;
    }
}