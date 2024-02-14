// useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
    favoriteAlbums: [],
    addFavoriteAlbum: (album) =>
    set((state) => {
      // 즐겨찾기 목록에 해당 앨범이 이미 있는지 확인
        const isAlbumExist = state.favoriteAlbums.some((favAlbum) => favAlbum.id === album.id);
      // 이미 즐겨찾기 목록에 있지 않으면 추가
        if (!isAlbumExist) {
        return { favoriteAlbums: [...state.favoriteAlbums, album] };
        }
      // 이미 즐겨찾기 목록에 있으면 그대로 반환
        return state;
    }),
    removeFavoriteAlbum: (albumId) =>
    set((state) => ({ favoriteAlbums: state.favoriteAlbums.filter((album) => album.id !== albumId) })),
}));

export default useStore;
