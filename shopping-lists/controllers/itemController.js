import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};
  
const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
        "Location": path,
    },
  });
};

const showSingleList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  const data = {
    list: await listService.getSingleList(id),
    collectedItems: await itemService.findCollected(id),
    notCollectedItems: await itemService.findNotCollected(id),
  };
  return new Response(await renderFile("singleList.eta", data), responseDetails);
};
  
const addItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  const formData = await request.formData();
  const name = formData.get("name");
  await itemService.addItem(id, name);
  return redirectTo("/lists/"+id);
};

const markAsCollected = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[4];
  const list_id = urlParts[2];
  await itemService.markAsCollected(id, list_id);
  return redirectTo("/lists/"+list_id);
};

export{addItem, showSingleList, markAsCollected};