export const addItems = (items = []) => ({
  type: 'ADD_ITEMS',
  items,
});
export const addItem = (item = {}) => ({
  type: 'ADD_ITEM',
  item,
});

export const editItem = (id, update = {}) => ({
  type: 'EDIT_ITEM',
  id,
  update,
});

export const removeItem = (id) => ({
  type: 'REMOVE_ITEM',
  id,
});
