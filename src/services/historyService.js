import { API_URL } from "./api";

export const getHistory = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};