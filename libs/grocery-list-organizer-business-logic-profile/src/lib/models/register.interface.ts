export interface RegisterProfileHttpRequest {
  userId: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Profile {
  firstName: string;
  accessToken: string;
}

export interface LoginHttpRequest {
  userName: string;
  password: string;
}
