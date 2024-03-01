import { SigninArgs, SigninResponse } from "services/auth";
import { apiClient } from "../client";

class AuthService {
  async signin(args: SigninArgs): Promise<SigninResponse> {
    const response = await apiClient.post("/auth/signin", args);

    return response.data.data as SigninResponse;
  }
}

export const authService = new AuthService();
