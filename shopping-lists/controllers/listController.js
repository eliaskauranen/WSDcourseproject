import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";

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

const showActive = async (request) => {
  return new Response(await renderFile("lists.eta", { lists: await listService.findActive() }), responseDetails);
};
  
const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name"); 
  await listService.add(name);
  return redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  await listService.deactivate(id);
  return redirectTo("/lists");
};

export{addList, showActive, deactivateList};