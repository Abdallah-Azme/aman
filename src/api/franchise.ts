"use server"

import { FranchiseRequestData } from "@/types/franchise";
import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const franchiseApi = {
  franchisePage: `${baseUrl}/franchise-page/info`,
  whyFranchise: `${baseUrl}/franchise-page/why-franchise`,
  requirements: `${baseUrl}/franchise-page/requirements`,
  franchiseRequest: `${baseUrl}/franchise-page/franchise-request`,
}

async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export async function getFranchisePage(){
    try {
        const response = await fetch(franchiseApi.franchisePage, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch franchise page");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching franchise page:", error);
        return null;
    }
}

export async function getWhyFranchise(){
    try {
        const response = await fetch(franchiseApi.whyFranchise, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch why franchise");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching why franchise:", error);
        return null;
    }
}

export async function getRequirements(){
    try {
        const response = await fetch(franchiseApi.requirements, {
            headers: await getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch requirements");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching requirements:", error);
        return null;
    }
}

export const franchiseRequest = async (data: FranchiseRequestData) => {
  try {
    const response = await fetch(franchiseApi.franchiseRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": await getLocale() ||"en",
        },
        body: JSON.stringify(data),
    });
    const finalData = await response.json();
    return finalData;
  } catch (error) {
    console.error("Error franchise request:", error);
    throw error;
  }
}