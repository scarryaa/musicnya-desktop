import { Injectable } from '@angular/core';
import { MusicKit } from '@nyan-inc/shared-types';
import { MusickitBase } from './musickit-base.service';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPI {
  constructor(private readonly musickit: MusickitBase) {}

  // Fetch the data from the music api
  async requestData(url: string): Promise<any> {
    const result = await this.instance?.api?.v3.music(url);
    return result.data.data;
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
    const response = await fetch(
      `http://localhost:3001/v1/me/library/playlist-folders/p.playlistsroot/children${this.getQueryString()}&art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
      {
        headers: {
          'media-user-token': (this.instance as any).musicUserToken,
          authorization: `Bearer ${(this.instance as any).developerToken}`,
          origin: 'https://beta.music.apple.com',
          'access-control-allow-origin': '*',
          'allowed-headers': '*',
        },
        mode: 'cors',
      }
    );
    const json = await response.json();
    return json.data;
  }

  async getRoom(
    id: string,
    type: string
  ): Promise<MusicKit.AppleCurators | MusicKit.Curators> {
    switch (type) {
      case 'fcId': {
        return await fetch(
          `https://amp-api.music.apple.com/v1/editorial/us/multirooms/${id}?platform=web&extend=editorialArtwork%2Cuber%2ClockupStyle&l=en-us`,
          {
            headers: {
              'media-user-token': (this.instance as any).musicUserToken,
              authorization: `Bearer ${(this.instance as any).developerToken}`,
              origin: 'https://beta.music.apple.com',
              'access-control-allow-origin': '*',
              'allowed-headers': '*',
            },
            mode: 'cors',
          }
        ).then(async (response) => {
          const curator = await response.json();
          return curator.data[0];
        });
      }
      case 'pp':
      case 'id': {
        const response = await fetch(
          `https://amp-api.music.apple.com/v1/editorial/us/multiplex/${id}?art%5Burl%5D=f&format%5Bresources%5D=map&platform=web`,
          {
            headers: {
              'media-user-token': (this.instance as any).musicUserToken,
              authorization: `Bearer ${(this.instance as any).developerToken}`,
              origin: 'https://beta.music.apple.com',
              'access-control-allow-origin': '*',
              'allowed-headers': '*',
            },
            mode: 'cors',
          }
        ).then(async (response) => {
          const json = await response.json();
          return await fetch(
            `https://amp-api.music.apple.com/v1/editorial/us/multirooms/${json.results.target.id}?platform=web&extend=editorialArtwork%2Cuber%2ClockupStyle&l=en-us`,
            {
              headers: {
                'media-user-token': (this.instance as any).musicUserToken,
                authorization: `Bearer ${
                  (this.instance as any).developerToken
                }`,
                origin: 'https://beta.music.apple.com',
                'access-control-allow-origin': '*',
                'allowed-headers': '*',
              },
              mode: 'cors',
            }
          ).then(async (response) => {
            const curator = await response.json();
            return curator.data[0];
          });
        });
        return response;
      }
      case 'apple-curators': {
        return await fetch(
          `https://amp-api.music.apple.com/v1/catalog/us/apple-curators/${id}?platform=web&include=grouping%2Cplaylists&extend=editorialArtwork&art%5Burl%5D=f&l=en-us`,
          {
            headers: {
              'media-user-token': (this.instance as any).musicUserToken,
              authorization: `Bearer ${(this.instance as any).developerToken}`,
              origin: 'https://beta.music.apple.com',
              'access-control-allow-origin': '*',
              'allowed-headers': '*',
            },
            mode: 'cors',
          }
        ).then(async (response) => {
          const curator = await response.json();
          return curator.data[0];
        });
      }
      default: {
        return new Promise((resolve) => resolve({} as any));
      }
    }
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

  async getLikes(
    type: MusicKit.MediaItemType,
    ids: string[]
  ): Promise<MusicKit.Resource[]> {
    return this.requestData(
      `/v1/me/ratings/${type}/?platform=web&ids=${ids.join(',')}`
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
    const response = await fetch(
      `http://localhost:3001/v1/me/recommendations?art%5Burl%5D=f&displayFilter%5Bkind%5D=MusicCircleCoverShelf%2CMusicCoverGrid%2CMusicCoverShelf%2CMusicNotesHeroShelf%2CMusicSocialCardShelf%2CMusicSuperHeroShelf&extend=editorialVideo%2CplainEditorialCard%2CplainEditorialNotes&extend%5Bplaylists%5D=artistNames&extend%5Bstations%5D=airTime%2CsupportsAirTimeUpdates&fields%5Bartists%5D=name%2Cartwork%2Curl&include%5Balbums%5D=artists&include%5Bpersonal-recommendation%5D=primary-content&meta%5Bstations%5D=inflectionPoints&name=listen-now&omit%5Bresource%5D=autos&platform=web&timezone=-07%3A00&types=activities%2Calbums%2Capple-curators%2Cartists%2Ccurators%2Ceditorial-items%2Clibrary-albums%2Clibrary-playlists%2Cmusic-movies%2Cplaylists%2Csocial-profiles%2Csocial-upsells%2Csongs%2Cstations%2Ctv-shows%2Cuploaded-audios%2Cuploaded-videos&with=friendsMix%2Clibrary%2Csocial`,
      {
        headers: {
          'media-user-token': (this.instance as any).musicUserToken,
          authorization: `Bearer ${(this.instance as any).developerToken}`,
          origin: 'https://beta.music.apple.com',
          'access-control-allow-origin': '*',
          'allowed-headers': '*',
        },
        mode: 'cors',
      }
    );
    const json = await response.json();
    return json.data as MusicKit.PersonalRecommendation[];
  }

  async getSearchCategories(): Promise<MusicKit.PersonalRecommendation[]> {
    const request = await this.requestData(
      `/v1/recommendations/us?name=search-landing&platform=web&extend=editorialArtwork&art[url]=f,c&types=editorial-items,apple-curators,activities`
    );

    return request as MusicKit.PersonalRecommendation[];
  }

  async getSearchSuggestions(
    query: string
  ): Promise<MusicKit.SearchSuggestionsResponse> {
    const request = await this.instance.api.v3.music(
      `/v1/catalog/us/search/suggestions?term=${query}&fields%5Balbums%5D=artwork%2Cname%2CplayParams%2Curl%2CartistName%2Cid%2CcontentRating&fields%5Bartists%5D=url%2Cname%2Cartwork%2Cid&fields%5Bsongs%5D=artwork%2Cname%2CplayParams%2Curl%2CartistName%2Cid%2CcontentRating%2CalbumName&kinds=terms%2CtopResults&limit%5Bresults%3Aterms%5D=1&limit%5Bresults%3AtopResults%5D=10&omit%5Bresource%5D=autos&platform=web&types=activities%2Calbums%2Cartists%2Ceditorial-items%2Cmusic-movies%2Cplaylists%2Crecord-labels%2Csongs%2Cstations`
    );
    console.log(request);
    return (request as any).data as MusicKit.SearchSuggestionsResponse;
  }

  async getRadioCategories(): Promise<MusicKit.Groupings[]> {
    const response = await fetch(
      `http://127.0.0.1:3001/v1/editorial/us/groupings?platform=web&name=radio&omit%5Bresource%3Aartists%5D=relationships&include%5Balbums%5D=artists&include%5Bsongs%5D=artists&include%5Bmusic-videos%5D=artists&extend=editorialArtwork%2CartistUrl&fields%5Bartists%5D=name%2Curl%2Cartwork%2CeditorialArtwork%2CgenreNames%2CeditorialNotes&art%5Burl%5D=f`,
      {
        headers: {
          'media-user-token': (this.instance as any).musicUserToken,
          authorization: `Bearer ${(this.instance as any).developerToken}`,
          origin: 'https://beta.music.apple.com',
          'access-control-allow-origin': '*',
        },
        mode: 'cors',
      }
    );
    const json = await response.json();
    return json.data as MusicKit.Groupings[];
  }

  async getBrowseCategories(): Promise<MusicKit.Groupings[]> {
    const response = await fetch(
      `http://127.0.0.1:3001/v1/editorial/us/groupings?art[url]=f&extend=artistUrl,editorialArtwork,plainEditorialNotes&extend[station-events]=editorialVideo&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,plainEditorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=name,url,artwork&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=events&name=music&omit[resource:artists]=relationships&platform=web&relate[songs]=albums&tabs=subscriber`,
      {
        headers: {
          'media-user-token': (this.instance as any).musicUserToken,
          authorization: `Bearer ${(this.instance as any).developerToken}`,
          origin: 'https://beta.music.apple.com',
          'access-control-allow-origin': '*',
        },
        mode: 'cors',
      }
    );
    const json = await response.json();
    return json.data as MusicKit.Groupings[];
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

  async unloveItem(type: any, id: string): Promise<any> {
    await this.musickit.instance.api.v3.music(
      `v1/me/ratings/${type}/${id}`,
      undefined,
      {
        fetchOptions: {
          method: 'DELETE',
        },
      }
    );
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
