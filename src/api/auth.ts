"use server"
import { RegisterData, VerifyOtpData, LoginData, AuthResponse } from "@/types/auth";
import { getLocale } from "next-intl/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const authApi = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
    verifyOtp: `${baseUrl}/auth/verify-otp`,
    resendOtp: `${baseUrl}/auth/resend-otp`,
}

export const signUp = async (data: RegisterData) => {
  try {
    const response = await fetch(authApi.register, {
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
    console.error("Error registering:", error);
    throw error;
  }
}
export const login = async (data: LoginData) => {
  try {
    const response = await fetch(authApi.login, {
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
    console.error("Error logging in:", error);
    throw error;
  }
}


export const verifyOtp = async (data:VerifyOtpData) => {
    try {
      const response = await fetch(authApi.verifyOtp, {
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
      console.error("Error verifying OTP:", error);
      throw error;
    }
}

export const resendOtp = async (data: {email:string}) => {
  try {
    const response = await fetch(authApi.resendOtp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": await getLocale() || "en",
      },
      body: JSON.stringify(data),
    });
    const finalData = await response.json();
    return finalData;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
}



