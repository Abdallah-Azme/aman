"use server"

import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const aboutApi = {
  whoUs: `${baseUrl}/about/who-us`,
    aboutFoundations: `${baseUrl}/about/foundation-details`,
  info: `${baseUrl}/company-info`,
}

async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export async function getWhoUs(){
    try {
        const response = await fetch(aboutApi.whoUs, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch who us");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching who us:", error);
        return null;
    }
}

export async function getAboutFoundations(){
    try {
        const response = await fetch(aboutApi.aboutFoundations, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch about foundations");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching about foundations:", error);
        return null;
    }
}

export async function getCompanyInfo(){
    try {
        const response = await fetch(aboutApi.info, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch company info");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching company info:", error);
        return null;
    }
}
