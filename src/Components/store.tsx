// store.ts
import { createStore } from 'solid-js/store';
import { mockServerMatch } from './mockdata';

export type AppState = {
  currentMatch: ServerMatch | null;
  user: string | null;
  error: string | null;
};

export const [store, setStore] = createStore<AppState>({
  currentMatch: mockServerMatch,
  user: "TestUser",
  error: null
});