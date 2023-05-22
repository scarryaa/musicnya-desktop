import { Injectable } from '@angular/core';
import { MediaItemType } from '@nyan-inc/shared';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root',
})
export class MusickitAPI {
  instance!: any;

  /**
   * Initialize MusicKit
   * @param developmentToken - The development token
   */
  async initMusicKit(developmentToken: string) {
    this.instance = await MusicKit.configure({
      developerToken: developmentToken,
      app: {
        name: 'Apple Music',
        build: '1978.4.1',
        version: '1.0',
      },
      sourceType: 24,
      suppressErrorDialog: false,
    });
    return this.instance;
  }

  /**
   * Set the queue of the instance
   * @param object - The object to set the queue with
   */
  async setQueue(object: any) {
    await this.instance.setQueue({ ...object });
    return object.startPlaying;
  }

  /**
   * Play the instance
   */
  async play() {
    return await this.instance.play();
  }

  /**
   * Get library playlists
   */
  async getLibraryPlaylists(): Promise<any[]> {
    return await this.requestData(
      '/v1/me/library/playlist-folders/p.playlistsroot/children?art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls'
    ).then(
      async (data) =>
        await Promise.all(
          data.map(async (item: any) => {
            const tracks = await this.requestData(item.href);
            return {
              ...item,
              tracks: tracks,
            };
          })
        )
    );
  }

  /**
   * Find by URL
   * @param url - The URL to find
   */
  async findByUrl(type: MediaItemType, id: string): Promise<any> {
    return await this.requestData(
      '/v1/' +
        (type.includes('library') ? 'me/' : 'catalog/us/') +
        type.split('-').join('/') +
        's/' +
        `${id}${this.getQueryString()}`
    );
  }

  // Fetch the data from the music api
  async requestData(url: string): Promise<any> {
    const result = await MusicKit.getInstance().api.v3.music(url);
    return result.data.data;
  }

  // Here we define the methods using the requestData function
  async getLibraryPlaylistSongs(id: string): Promise<any[]> {
    return this.requestData(
      `/v1/me/library/playlists/${id}/tracks${this.getQueryString()}`
    );
  }

  async getLibraryAlbum(id: string): Promise<any> {
    return this.requestData(
      `/v1/me/library/albums/${id}${this.getQueryString()}`
    );
  }

  async getAlbum(id: string): Promise<any> {
    return this.requestData(
      `/v1/catalog/us/albums/${id}${this.getQueryString()}`
    );
  }

  async getPlaylist(id: string): Promise<any> {
    return this.requestData(
      `/v1/catalog/us/playlists/${id}${this.getQueryString()}`
    );
  }

  async getLibraryPlaylist(id: string): Promise<any> {
    return this.requestData(
      `/v1/me/library/playlists/${id}${this.getQueryString()}`
    );
  }

  async getLibraryArtist(id: string): Promise<any> {
    return this.requestData(
      `/v1/me/library/artists/${id}${this.getQueryString()}`
    );
  }

  async getArtist(id: string): Promise<any> {
    return this.requestData(
      `/v1/catalog/us/artists/${id}${this.getQueryString()}`
    );
  }

  // Provide common query string for API endpoints
  getQueryString(): string {
    return '?art[url]=f&extend[tracks]=name&extend[catalog]=id&fields[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=flat&include=tracks,curator,catalog&include[songs]=artists&l=en-US&limit[tracks]=50';
  }
}
