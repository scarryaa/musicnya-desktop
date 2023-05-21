// import { ContentRating, MediaItemType, MediaKind, PlaylistType, TrackTypes, EditorialNotes } from './ngx-apple-music.interface';
// import { Album, Artist, Song, MusicVideo, Playlist, Station } from './ngx-apple-music.models';

// describe('Album', () => {
//   it('should be created', () => {
//     const obj: Album = new Album({id: '0', href: '', attributes: {artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], isCompilation: false, isComplete: true,
//       isMasteredForItunes: true, isSingle: false, name: 'Album', trackCount: 2, url: ''}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.albums);
//     expect(obj.attributes).toEqual({artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], isCompilation: false, isComplete: true,
//       isMasteredForItunes: true, isSingle: false, name: 'Album', trackCount: 2, url: ''});
//   });
// });

// describe('Artist', () => {
//   it('should be created', () => {
//     const obj: Artist = new Artist({id: '0', href: '', attributes: {artwork: {height: 500, width: 500, url: ''}, genreNames: [''], name: 'Artist', url: '', editorialNotes: {short: '', standard: '', name: '', tagline: ''}}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.artists);
//     expect(obj.attributes).toEqual({artwork: {height: 500, width: 500, url: ''}, editorialNotes: {short: '', standard: '', name: '', tagline: ''}, genreNames: [''], name: 'Artist', url: ''});
//   });
// });

// describe('Song', () => {
//   it('should be created', () => {
//     const obj: Song = new Song({id: '0', href: '', attributes: {albumName: 'Album', artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], hasLyrics: true, isAppleDigitalMaster: true, 
//       name: 'Song', previews: {url: ''}, url: '', durationInMillis: 500}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.songs);
//     expect(obj.attributes).toEqual({albumName: 'Album', artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], hasLyrics: true, isAppleDigitalMaster: true, 
//       name: 'Song', previews: {url: ''}, url: '', durationInMillis: 500});
//   });
// });

// describe('MusicVideo', () => {
//   it('should be created', () => {
//     const obj: MusicVideo = new MusicVideo({id: '0', href: '', attributes: {artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], has4K: true, hasHDR: true, 
//       name: 'MusicVideo', previews: {url: ''}, url: '', durationInMillis: 500}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.musicVideos);
//     expect(obj.attributes).toEqual({artistName: 'Artist', artwork: {height: 500, width: 500, url: ''}, genreNames: [''], has4K: true, hasHDR: true, 
//       name: 'MusicVideo', previews: {url: ''}, url: '', durationInMillis: 500, videoSubType: 'preview'});
//   });
// });

// describe('Playlist', () => {
//   it('should be created', () => {
//     const obj: Playlist = new Playlist({id: '0', href: '', attributes: {curatorName: 'Curator', isChart: false, artwork: {height: 500, width: 500, url: ''},
//       name: 'Playlist', playlistType: PlaylistType.editorial, url: '', trackTypes: [TrackTypes.musicVideos, TrackTypes.songs]}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.playlists);
//     expect(obj.attributes).toEqual({curatorName: 'Curator', isChart: false, artwork: {height: 500, width: 500, url: ''},
//       name: 'Playlist', playlistType: PlaylistType.editorial, url: '', trackTypes: [TrackTypes.musicVideos, TrackTypes.songs]});
//   });
// });

// describe('Station', () => {
//   it('should be created', () => {
//     const obj: Station = new Station({id: '0', href: '', attributes: {artwork: {height: 500, width: 500, url: ''}, isLive: true, mediaKind: MediaKind.audio, name: 'Station',
//       url: '', durationInMillis: 300, contentRating: ContentRating.explicit, stationProviderName: "StationProvider"}});
//     expect(obj.id).toBe('0');
//     expect(obj.href).toBe('');
//     expect(obj.type).toBe(MediaItemType.stations);
//     expect(obj.attributes).toEqual({artwork: {height: 500, width: 500, url: ''}, isLive: true, mediaKind: MediaKind.audio, name: 'Station',
//     url: '', durationInMillis: 300, contentRating: ContentRating.explicit, stationProviderName: "StationProvider"});
//   });
// });