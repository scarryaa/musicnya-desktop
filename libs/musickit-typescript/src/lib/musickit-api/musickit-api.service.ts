import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusickitAPIService {
  instance!: MusicKit.MusicKitInstance;

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

  async setQueue(object: MusicKit.QueueOptions) {
    return await this.instance
      .setQueue({ ...object })
      .then(() => object.startPlaying);
  }

  async play() {
    return await this.instance.play();
  }

  async getUserPlaylists(): Promise<MusicKit.LibraryPlaylists[]> {
    // if (this.state.isPreviewMode) {
    //   return SampleData.userPlaylists;
    // }

    var playlists = await MusicKit.getInstance().api.v3.music(
      '/v1/me/library/playlist-folders/p.playlistsroot/children?art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls'
    );
    return playlists.data.data as unknown as MusicKit.LibraryPlaylists[];
  }

  async findByUrl(url: string): Promise<MusicKit.ResourceResponse> {
    var results = await MusicKit.getInstance().api.v3.music(
      url +
        '?art[url]=f&extend[tracks]=name&extend[catalog]=id&fields[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=flat&include=tracks,curator,catalog&include[songs]=artists&l=en-US&limit[tracks]=1'
    );
    return results as MusicKit.ResourceResponse;
  }

  async getTrackRelationships(id: string): Promise<MusicKit.ResourceResponse> {
    var results = await MusicKit.getInstance().api.v3.music(
      '/v1/me/library/playlists/' + id + '/tracks'
    );
    return results as MusicKit.ResourceResponse;
  }
}
