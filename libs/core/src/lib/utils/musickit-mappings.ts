// Maps a MusicKit object to a MediaItem object depending on its type
// export const determineTypeAndMap = (
//   item:
//     | MediaItem
//     | MusicKit.MediaItem
//     | MusicKit.LibrarySongs
//     | MusicKit.Songs
//     | MusicKit.LibraryPlaylists
//     | MusicKit.PersonalRecommendation
// ):
//   | Song
//   | LibrarySong
//   | MediaItem
//   | LibraryAlbum
//   | Album
//   | LibraryPlaylist
//   | PersonalRecommendation
//   | Playlist => {
//   if (isMediaItem(item)) {
//     return item;
//   }

//   const baseItem: MediaItem = {
//     type: item.type as MediaTypes,
//     id: item.id as string,
//   };

//   // Depending on the type of MusicKit object, map to different MediaItem objects
//   switch (item.type) {
//     case 'library-playlists': {
//       return {
//         ...baseItem,
//         title: item.attributes?.name,
//         songs: mapSongs(item?.['songs'] ?? item?.relationships?.tracks?.data),
//         duration: item?.['songs']?.reduce(
//           (accumulator: any, song: any) => accumulator + (song.duration ?? 0),
//           0
//         ),
//         curator: item?.relationships?.catalog?.data[0].attributes?.curatorName,
//         artwork: {
//           dominantColor:
//             item.attributes?.artwork?.url ??
//             (item['songs'] as Song[])?.[0]?.artwork?.dominantColor,
//           url: formatArtworkUrl(
//             item.attributes?.artwork?.url ??
//               (item?.['songs'] as Song[])?.[0]?.artwork?.url,
//             400
//           ),
//         },
//       } as LibraryPlaylist;
//     }
//     case 'library-songs': {
//       return {
//         ...baseItem,
//         title: item.attributes?.name,
//         artists: [item?.attributes?.artistName] as string[],
//         album:
//           item?.attributes?.albumName ??
//           item?.relationships?.albums?.data?.map(
//             (album: MKAlbums) => album.attributes?.name
//           ),
//         duration: item.attributes?.durationInMillis ?? 0,
//         artwork: {
//           dominantColor: item.attributes?.artwork?.bgColor,
//           url: formatArtworkUrl(item.attributes?.artwork?.url, 400),
//         },
//       } as LibrarySong;
//     }
//     default: {
//       throw new Error(`Unable to map MusicKit object of type '${item.type}'.`);
//     }
//   }
// };

// // Depending on the type of Song object, map to different Song objects
// const mapSongs = (songs?: MusicKit.Songs[] | Song[]): Song[] => {
//   console.log(songs);
//   if (!songs) {
//     return [] as Song[];
//   } else if (
//     songs.some((song: MusicKit.Songs | Song) => song.type === 'songs')
//   ) {
//     return songs.map((song: MusicKit.Songs) => {
//       const mkSong = song as MusicKit.Songs;

//       return {
//         type: 'song',
//         id: mkSong.id,
//         title: mkSong?.attributes?.name,
//         duration: mkSong?.attributes?.durationInMillis ?? 0,
//         artists:
//           mkSong?.relationships?.artists?.data?.map(
//             (artist: MusicKit.Artist) => artist?.attributes?.name ?? ''
//           ) ?? [],
//         album: mkSong?.attributes?.albumName,
//         artwork: {
//           dominantColor: mkSong.attributes?.artwork.bgColor,
//           url: formatArtworkUrl(mkSong.attributes?.artwork.url, 400),
//         },
//       };
//     });
//   } else {
//     return songs as Song[];
//   }
// };
