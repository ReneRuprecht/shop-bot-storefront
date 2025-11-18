import axios from "axios";
import { env } from "../config/env.js";

export async function apiGet(path: string) {
  try {
    const { data } = await axios.get(`${env.url}/store-api/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "sw-access-key": env.swAccessKey,
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Error while fetching products: ${error}`);
  }
}
