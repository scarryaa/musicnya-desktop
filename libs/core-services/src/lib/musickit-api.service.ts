import { Injectable } from '@angular/core';
import { MusicKit } from '../types';
import { MusickitBase } from './musickit-base.service';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPI {
  private _instance!: MusicKit.MusicKitInstance;

  constructor(private musickit: MusickitBase) {
    this.instance = this.musickit.instance;
  }

  /**
   * Get the instance
   */

  public get instance(): any {
    return this.musickit.instance;
  }

  public set instance(instance: any) {
    this._instance = instance;
  }

  /**
   * Get library playlists
   */
  async getLibraryPlaylists(): Promise<any[]> {
    return await this.requestData(
      '/v1/me/library/playlist-folders/p.playlistsroot/children?art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls'
    );
  }

  /**
   * Find by URL
   * @param url - The URL to find
   */
  async findByUrl(type: any, id: string): Promise<any> {
    return await this.requestData(
      '/v1/' +
        (type.includes('library') ? 'me/' : 'catalog/us/') +
        type.split('-').join('/') +
        '/' +
        `${id}${this.getQueryString()}`
    );
  }

  // Fetch the data from the music api
  async requestData(url: string): Promise<any> {
    const result = await this.instance.api.v3.music(url);
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

  async getRecentlyPlayed(): Promise<any> {
    const req = await this.requestData(
      `/v1/me/recent/played${this.getQueryString()}&limit=20`
    );
    console.log(req);
    return req;
  }

  async getRecommendations(): Promise<any> {
    const req = await this.requestData(
      `/v1/me/recommendations${this.getQueryString()}?include[albums]=artists&extend=editorialArtwork,editorialVideo,offers,trackCount&limit[albums]=10`
    );
    console.log(req);
    return req;
  }

  // Provide common query string for API endpoints
  getQueryString(): string {
    return '?art[url]=f&extend[tracks]=name&extend[albums]=name&extend[catalog]=id&fields[album]=name[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=flat&include=tracks,curator,catalog&include[songs]=artists,albums&l=en-US&limit[tracks]=50';
  }
}
