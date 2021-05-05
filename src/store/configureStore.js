import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import itemsReducer from '../reducers/items';
import tracksReducer from '../reducers/tracks';
import trackDatesReducer from '../reducers/trackDates';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      items: itemsReducer,
      tracks: tracksReducer,
      trackDates: trackDatesReducer,
    }),
  );
  return store;
};

export default configureStore;
