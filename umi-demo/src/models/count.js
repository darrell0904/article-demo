import key from 'keymaster';
import { delay } from '../utils/utils';

export default {

  namespace: 'count',

  state: {
    record: 0,
    current: 0,
  },

  effects: {
    *add(action, { call, put }) {
      yield put({ type: 'add1' });
      yield call( delay, 1000 );
      yield put({ type: 'minus' });
    },
  },

  reducers: {
    add1(state) {
      const newCurrent = state.current + 1;

      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1 };
    },
   },

  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  },

};
