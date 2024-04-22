import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showMain = async (request) => {
    const data = {
        listCount: await listService.listCount(),
        itemCount: await itemService.itemCount(),
    };
    return new Response(await renderFile("mainPage.eta", data), responseDetails);
};

export {showMain};