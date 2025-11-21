import axios from "axios";
import { env } from "../../config/env.js";

export async function apiGet(path: string, params?: any) {
  try {
    const { data } = await axios.get(`${env.url}/store-api/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "sw-access-key": env.swAccessKey,
      },
      params: params,
    });

    if (!data) throw new Error("Response is empty");
    if (!data.elements) throw new Error("No elements in response");

    return data;
  } catch (error) {
    throw new Error(`Error while fetching products: ${error}`);
  }
}
