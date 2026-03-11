"use server"

import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const strategicApi = {
  strategicPage: `${baseUrl}/strategic/vision`,
  strategicGoals: `${baseUrl}/home/goals`,
}

async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export async function getVision(){
    try {
        const response = await fetch(strategicApi.strategicPage, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch vision page");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching vision page:", error);
        return null;
    }
}

export async function getGoals(){
    try {
        const response = await fetch(strategicApi.strategicGoals, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch goals page");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching goals page:", error);
        return null;
    }
}