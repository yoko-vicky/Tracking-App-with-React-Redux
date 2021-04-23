const addItems = (items = []) => ({
  type: 'ADD_ITEMS',
  items,
});

// export const removeItem = (id) => ({
//   type: 'REMOVE_ITEM',
//   id,
// });

export default addItems;
