import { create } from 'zustand'

export const useCollectionStore = create((set) => ({
  collections: [],
  selectedCollection: null,
  isLoading: false,

  setCollection:(collection)=>set({ selectedCollection: collection }),

  addCollection:(collection)=>
    set((state)=>({
         collections: [...state.collections, collection],
    })),
}))
