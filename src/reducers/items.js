const defaultItemsState = [];

const ItemsReducer = (state = defaultItemsState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.item,
      ];
    case 'EDIT_ITEM':
      return state.map((item) => (item.id === action.id ? { ...item, ...action.update } : item));
    case 'REMOVE_ITEM':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
export default ItemsReducer;
