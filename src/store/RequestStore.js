import { create } from 'zustand';

export const useRequestStore = create((set) => ({
  currentRequest: {
    method: 'GET',
    url: '',
    headers: [],
    queryParams: [],
    body: '',
    bodyType: 'none',
    authType: 'none',
    authValue: '',
  },
  
  response: null,
  isLoading: false,
  
  setMethod: (method) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, method },
    })),
  
  setUrl: (url) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, url },
    })),
  
  setHeaders: (headers) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, headers },
    })),
  
  setQueryParams: (queryParams) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, queryParams },
    })),
  
  setBody: (body) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, body },
    })),
  
  setBodyType: (bodyType) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, bodyType },
    })),
  
  setAuthType: (authType) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, authType },
    })),
  
  setAuthValue: (authValue) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, authValue },
    })),
  
  setResponse: (response) => set({ response }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  resetRequest: () =>
    set({
      currentRequest: {
        method: 'GET',
        url: '',
        headers: [],
        queryParams: [],
        body: '',
        bodyType: 'none',
        authType: 'none',
        authValue: '',
      },
      response: null,
    }),
}));