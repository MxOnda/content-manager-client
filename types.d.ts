declare module "services/auth" {
  interface SigninArgs {
    email: string;
    password: string;
  }

  interface SigninResponse {
    user: {
      id: string;
      fullname: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  }
}
