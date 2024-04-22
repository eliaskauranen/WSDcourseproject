import { executeQuery } from "../database/database.js";

const findCollected = async (id) => {
  const result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $id AND collected = true ORDER BY name;", {
    id: id,
  });
  if (result) {
    return result.rows;
  }
  return [];
};

const findNotCollected = async (id) => {
    const result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $id AND collected = false ORDER BY name;", {
      id: id,
    });
    if (result) {
      return result.rows;
    }
    return [];
};

const itemCount = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_list_items;"
    );
  if (result) {
    return result.rows[0].count;
  }
  return [];
};

const addItem = async (id, name) => {
  await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($shopping_list_id, $name);", {
    shopping_list_id: id, name: name,
  });
};

const markAsCollected = async (id, list_id) => {
  await executeQuery("UPDATE shopping_list_items SET collected = true WHERE id = $id AND shopping_list_id = $list_id;", {
    id: id, list_id: list_id,
  });
};

export { findCollected, findNotCollected, itemCount, addItem, markAsCollected };