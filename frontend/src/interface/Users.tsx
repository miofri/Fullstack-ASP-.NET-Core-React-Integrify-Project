export interface AuthInfo {
  email: string;
  password: string;
}

export interface BearerToken {
  bearerToken: string;
}

export interface CurrentUser {
  id: string;
  role: string;
  email: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  userName: string;
  password: string;
  avatar: string;
}

export interface CurrentUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatar: string;
  address: string;
}

export interface AdminAllUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatar: string;
  address: string;
}
