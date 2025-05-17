// store.ts
import { createStore } from 'solid-js/store';
import { mockServerMatch, transformMatch } from './mockdata';

export type AppState = {
  currentMatch: UserMatch | null;
  user: string | null;
  error: string | null;
};

export const [store, setStore] = createStore<AppState>({
  currentMatch: transformMatch(mockServerMatch, 'TestUser'),
  user: "TestUser",
  error: null
});