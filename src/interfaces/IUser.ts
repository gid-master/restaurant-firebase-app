export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAuthentication {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthenticationResponse {
  success: boolean;
  message: string;
}
