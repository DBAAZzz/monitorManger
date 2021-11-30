
import { useStore } from 'vuex'
import { key } from '@/store'
import { State } from '@/store/type'

import { Getters, Dispatch, Commit } from './utils';

interface StoreHooks {
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}

const routeStoreHooks = (): StoreHooks => {
  const store = useStore<State>(key);
  const { state, getters, dispatch, commit }: StoreHooks = store;

  return {
    state,
    getters,
    commit,
    dispatch,
  };
}

export { routeStoreHooks };