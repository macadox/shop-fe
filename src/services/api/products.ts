import { get } from "./api";
import { PRODUCTS_LINK } from "../../constants/apiLinks";

export const getAllProducts = async (mock = false) =>
  await get(PRODUCTS_LINK, mock ? { mock: "GetAllProducts.json" } : {});
