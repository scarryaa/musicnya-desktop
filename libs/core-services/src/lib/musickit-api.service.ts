import { Injectable } from '@angular/core';
import { MusicKit } from '@nyan-inc/shared-types';
import { MusickitBase } from './musickit-base.service';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPI {
  private readonly _instance!: MusicKit.MusicKitInstance;

  constructor(private readonly musickit: MusickitBase) {
    this._instance = this.musickit.instance;
  }

  /**
   * Get the instance
   */

  public get instance(): MusicKit.MusicKitInstance {
    return this.musickit.instance;
  }

  /**
   * Get library playlists
   */
  async getLibraryPlaylists(): Promise<any[]> {
    return await this.requestData(
      `/v1/me/library/playlist-folders/p.playlistsroot/children${this.getQueryString()}&art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`
    );
  }

  /**
   * Get Library Albums
   */
  async getLibraryAlbums(): Promise<MusicKit.LibraryAlbums[]> {
    return await this.requestData(
      `/v1/me/library/albums${this.getQueryString()}`
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
    const result = await this.instance?.api?.v3.music(url);
    return result.data.data;
  }

  // Here we define the methods using the requestData function
  async getLibraryPlaylistSongs(id: string): Promise<any[]> {
    return this.requestData(
      `/v1/me/library/playlists/${id}/tracks${this.getQueryString()}`
    );
  }

  async getLibraryAlbum(id: string): Promise<MusicKit.LibraryAlbums> {
    return this.requestData(
      `/v1/me/library/albums/${id}${this.getQueryString()}`
    );
  }

  async getAlbum(id: string): Promise<MusicKit.Albums[]> {
    return (await this.requestData(
      `/v1/catalog/us/albums/${id}${this.getQueryString()}`
    )) as MusicKit.Albums[];
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
      `/v1/catalog/us/artists/${id}?include=albums,station,imilar-artists,music-videos,playlists&views=top-videos,featured-playlists,singles,appears-on,similar-artists,top-songs,latest-release,featured-albums&limit[top-songs]=20&include[albums]=attributes,artwork,title,albumName&extend=editorialArtwork,editorialVideo,equivalents`
    );
  }

  async getCurator(id: string): Promise<any> {
    return this.requestData(
      `/v1/catalog/us/contents/${id}?platform=web&extend=editorialArtwork,artistUrl&omit[resource:artists]=relationships&include[groupings]=curator&include[albums]=artists&include[songs]=artists&include[music-videos]=artists&include=grouping,playlists&fields[artists]=name,url,artwork,editorialArtwork,genreNames,editorialNotes`
    );
  }

  async getRecentlyPlayed(): Promise<MusicKit.Resource[]> {
    const request = await this.requestData(
      `/v1/me/recent/played${this.getQueryString()}&limit=20&include=[albums]=artists&extend=editorialArtwork,artistUrl,artistId,editorialVideo,offers,trackCount&limit[albums]=10&include=[artists]=id`
    );
    console.log(request);
    return request as MusicKit.Resource[];
  }

  async getRecommendations(): Promise<MusicKit.PersonalRecommendation[]> {
    const request = await this.requestData(
      `/v1/me/recommendations?art%5Burl%5D=f&displayFilter%5Bkind%5D=MusicCircleCoverShelf%2CMusicCoverGrid%2CMusicCoverShelf%2CMusicNotesHeroShelf%2CMusicSocialCardShelf%2CMusicSuperHeroShelf&extend=editorialVideo%2CplainEditorialCard%2CplainEditorialNotes&extend%5Bplaylists%5D=artistNames&extend%5Bstations%5D=airTime%2CsupportsAirTimeUpdates&fields%5Bartists%5D=name%2Cartwork%2Curl&include%5Balbums%5D=artists&include%5Bpersonal-recommendation%5D=primary-content&meta%5Bstations%5D=inflectionPoints&name=listen-now&omit%5Bresource%5D=autos&platform=web&timezone=-07%3A00&types=activities%2Calbums%2Capple-curators%2Cartists%2Ccurators%2Ceditorial-items%2Clibrary-albums%2Clibrary-playlists%2Cmusic-movies%2Cplaylists%2Csocial-profiles%2Csocial-upsells%2Csongs%2Cstations%2Ctv-shows%2Cuploaded-audios%2Cuploaded-videos&with=friendsMix%2Clibrary%2Csocial`
    );
    console.log(request);
    return request as MusicKit.PersonalRecommendation[];
  }

  async getSearchCategories(): Promise<MusicKit.PersonalRecommendation[]> {
    const request = await this.requestData(
      `/v1/recommendations/us?name=search-landing&platform=web&extend=editorialArtwork&art[url]=f,c&types=editorial-items,apple-curators,activities`
    );

    return request as MusicKit.PersonalRecommendation[];
  }

  async getBrowseCategories(): Promise<MusicKit.Groupings[]> {
    const request = await this.requestData(
      `/v1/editorial/us/groupings?art[url]=f&extend=artistUrl,editorialArtwork,plainEditorialNotes&extend[station-events]=editorialVideo&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,plainEditorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=name,url,artwork&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=events&name=music&omit[resource:artists]=relationships&platform=web&relate[songs]=albums&tabs=subscriber`
    );
    console.log(request);
    return request as MusicKit.Groupings[];
  }

  async getArtistFromSongID(id: string): Promise<any> {
    const request = await this.requestData(
      `/v1/catalog/us/songs/${id}/artists${this.getQueryString()}?include[albums]=artists&extend=editorialArtwork,artistId,artistUrl,editorialVideo,offers,trackCount&limit[albums]=10&include=[artists]=id`
    );
    return request;
  }

  async getCuratorFromPlaylist(playlistId: string): Promise<any> {
    const request = await this.requestData(
      `v1/catalog/us/playlists/${playlistId}/curator?fields=url%2Cartwork%2Cname`
    );
    return request;
  }

  async getRatingsByIDs(type: any, ids: string[]): Promise<any> {
    const request = await this.musickit.instance.api.v3.music(
      `v1/me/ratings/${type}/?platform=web&ids=${ids.join(',')}`
    );
    return request.data.data;
  }

  async loveItem(type: any, id: string): Promise<any> {
    const request = await this.musickit.instance.api.v3.music(
      `v1/me/ratings/${type}/${id}`,
      undefined,
      {
        fetchOptions: {
          method: 'PUT',
          body: JSON.stringify({ attributes: { value: 1 } }),
        },
      }
    );
    return request.data.data;
  }

  // Provide common query string for API endpoints
  getQueryString(): string {
    return '?art[url]=f&extend[tracks]=name&extend[albums]=name&extend[catalog]=id&fields[album]=name[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=flat&include=tracks,curator,catalog&include[songs]=artists,albums&l=en-US&limit[tracks]=50';
  }
}
