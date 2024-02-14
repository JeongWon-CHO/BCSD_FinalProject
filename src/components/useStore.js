import { create } from 'zustand';

const useStore = create((set) => ({
  favoriteAlbums: [],
  favoriteTracks: [], // 트랙 즐겨찾기 목록을 위한 새 상태
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
  addFavoriteTrack: (track) => // 트랙 즐겨찾기 추가 액션
    set((state) => {
      const isTrackExist = state.favoriteTracks.some((favTrack) => favTrack.id === track.id);
      if (!isTrackExist) {
        return { favoriteTracks: [...state.favoriteTracks, track] };
      }
      return state;
    }),
  removeFavoriteTrack: (trackId) => // 트랙 즐겨찾기 제거 액션
    set((state) => ({ favoriteTracks: state.favoriteTracks.filter((track) => track.id !== trackId) })),
}));

export default useStore;