"use server"

import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const brandsApi = {
  brandsPage: `${baseUrl}/brand-page`,
}

async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export async function getBrandsPage(){
    try {
        const response = await fetch(brandsApi.brandsPage, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch brands page");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching brands page:", error);
        return null;
    }
}