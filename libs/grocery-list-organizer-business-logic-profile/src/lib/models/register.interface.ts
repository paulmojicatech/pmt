export interface RegisterProfileHttpRequest {
  userId: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  accessToken: string;
  expirationDate: string;
  roles: string[];
}
