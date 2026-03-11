"use server"

import { getLocale } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const homeApi = {
    hero: `${baseUrl}/home/hero`,
    foundations: `${baseUrl}/home/foundations`,
  brands: `${baseUrl}/home/home-brands`,
  projects: `${baseUrl}/home/feature-projects`,
  franchise: `${baseUrl}/home/franchise`,
  strategic: `${baseUrl}/home/goals`,
  team: `${baseUrl}/home/team-members`,
    faq: `${baseUrl}/home/faqs`,
}

async function getHeaders(){
  return {
    "Content-Type": "application/json",
    "Accept-Language": await getLocale() || "en",
  }
}

export const getHero = async () => {
  const res = await fetch(homeApi.hero, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch hero");
  }
  return await res.json();
}

export const getFoundations = async () => {
    const res = await fetch(homeApi.foundations, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch foundations");
  }
  return await res.json();
}

export const getBrandsHome = async () => {
    const res = await fetch(homeApi.brands, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch brands");
  }
  return await res.json();
}

export const getProjects = async () => {
    const res = await fetch(homeApi.projects, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch projects");
  }
  return await res.json();
}

export const getFranchise = async () => {
    const res = await fetch(homeApi.franchise, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch franchise");
  }
  return await res.json();
}

export const getStrategic = async () => {
    const res = await fetch(homeApi.strategic, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch strategic");
  }
  return await res.json();
}

export const getTeam = async () => {
    const res = await fetch(homeApi.team, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch team");
  }
  return await res.json();
}

export const getFaqs = async () => {
    const res = await fetch(homeApi.faq, {
      headers: await getHeaders(),
    });
  if(!res.ok){
    throw new Error("Failed to fetch faqs");
  }
  return await res.json();
}

