import { executeQuery } from "../database/database.js";

const findActive = async () => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE active = true;"
    );
  if (result) {
    return result.rows;
  }
  return [];
};

const listCount = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_lists;"
    );
  if (result) {
    return result.rows[0].count;
  }
  return [];
};

const add = async (name) => {
  await executeQuery(
    "INSERT INTO shopping_lists (name) VALUES ($name);", {
    name: name,
  });
};

const getSingleList = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE id = $id", { 
      id: id,
    });
    
    if (result) {
      return result.rows[0];
    }
    return [];
};

const deactivate = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id;", {
    id: id,
  });
};

export { findActive, listCount, add, getSingleList, deactivate };