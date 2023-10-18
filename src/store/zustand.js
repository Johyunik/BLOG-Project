import create from "zustand";

const useStore = create((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
}));

export default useStore;
