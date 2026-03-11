export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}


export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    };
    
}

export interface VerifyOtpData {
    email: string;
    otp: string;
}