const defaultItemsState = [];
const ItemsReducer = (state = defaultItemsState, action) => {
  switch (action.type) {
    case 'ADD_ITEMS':
      return action.items;
    case 'REMOVE_ALL_ITEMS':
      return defaultItemsState;
    default:
      return state;
  }
};
export default ItemsReducer;
