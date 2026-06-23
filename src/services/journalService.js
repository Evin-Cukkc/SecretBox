import { API_URL } from "./api";

export const sendJournal = async (journal) => {
  try {

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(journal),
    });

    const result = await response.json();

    return result;

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: error.message,
    };

  }
};