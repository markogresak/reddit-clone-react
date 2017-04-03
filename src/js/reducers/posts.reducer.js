import Immutable from 'seamless-immutable';

const initialState = Immutable({
  counter: 0,
});

const postActionMap = {
  // [TEST_ACTION]: (state) => {
  //   const counter = state.get('counter') + 1;
  //
  //   return state.merge({
  //     counter,
  //   });
  // },
  //
  // // Async action
  // [TEST_ASYNC_ACTION_START]: (state) => {
  //   return state.merge({
  //     asyncLoading: true,
  //     asyncError: null,
  //   });
  // },
  // [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
  //   return state.merge({
  //     asyncLoading: false,
  //     asyncError: action.data,
  //   });
  // },
  // [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
  //   return state.merge({
  //     asyncLoading: false,
  //     asyncData: action.data,
  //   });
  // },
};

export default function reducer(state = initialState, action = {}) {
  const fn = postActionMap[action.type];
  return fn ? fn(state, action) : state;
}
