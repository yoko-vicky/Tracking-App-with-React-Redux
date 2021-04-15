import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import './assets/styles/style.scss';

// import { addItem } from './actions/items';
// import { addTrack } from './actions/tracks';

const store = configureStore();

store.subscribe(() => {
  const { user, items, tracks } = store.getState();
  console.log('user', user);
  console.log('items', items);
  console.log('tracks', tracks);
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

//  Default Data Sample
// store.dispatch(addItem({
//   id: 1, title: 'Idioms', unit: 'idiom', icon: 'bi:chat-quote',
// }));
// store.dispatch(addItem({
//   id: 2, title: 'Grammer', unit: 'min', icon: 'bi:chat-quote',
// }));
// store.dispatch(addItem({
//   id: 3, title: 'Pronounciation', unit: 'min', icon: 'bi:chat-quote',
// }));
// store.dispatch(addItem({
//   id: 4, title: 'Reading', unit: 'page', icon: 'bi:chat-quote',
// }));
// store.dispatch(addItem({
//   id: 5, title: 'Spaking', unit: 'min', icon: 'bi:chat-quote',
// }));
// store.dispatch(addItem({
//   id: 6, title: 'Writing', unit: 'word', icon: 'bi:chat-quote',
// }));

// store.dispatch(addTrack({
//   id: 1, result: 32, item_id: 1, date: '2021-04-13 00:00:00 +0000',
// }));
// store.dispatch(addTrack({
//   id: 2, result: 64, item_id: 2, date: '2021-04-13 00:00:00 +0000',
// }));
// store.dispatch(addTrack({
//   id: 3, result: 180, item_id: 3, date: '2021-04-13 00:00:00 +0000',
// }));
// store.dispatch(addTrack({
//   id: 4, result: 55, item_id: 4, date: '2021-04-13 00:00:00 +0000',
// }));
// store.dispatch(addTrack({
//   id: 4, result: 55, item_id: 4, date: '2021-04-13 00:00:00 +0000',
// }));

ReactDOM.render(jsx, document.getElementById('root'));
