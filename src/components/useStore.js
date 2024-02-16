import { create } from 'zustand';

const useStore = create((set) => ({

  favoriteAlbums: [],
  favoriteTracks: [],

  addFavoriteAlbum: (album) =>
    set((state) => {
      const isAlbumExist = state.favoriteAlbums.some((favAlbum) => favAlbum.id === album.id);
      if (!isAlbumExist) {
        return { favoriteAlbums: [...state.favoriteAlbums, album] };
      }
      return state;
    }),
  removeFavoriteAlbum: (albumId) =>
    set((state) => ({ favoriteAlbums: state.favoriteAlbums.filter((album) => album.id !== albumId) })),
  addFavoriteTrack: (track) =>
    set((state) => {
      const isTrackExist = state.favoriteTracks.some((favTrack) => favTrack.id === track.id);
      if (!isTrackExist) {
        return { favoriteTracks: [...state.favoriteTracks, track] };
      }
      return state;
    }),
  removeFavoriteTrack: (trackId) =>
    set((state) => ({ favoriteTracks: state.favoriteTracks.filter((track) => track.id !== trackId) })),
}));

export default useStore;