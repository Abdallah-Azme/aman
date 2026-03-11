"use server"

import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export async function getSettings() {
  try {
    const response = await fetch(`${baseUrl}/settings`, {
      headers: await getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch settings");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}