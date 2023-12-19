export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: UserStatus;
}

export enum UserStatus {
  Active = 'Active',
  Blocked = 'Blocked',
}

export interface TableUser extends User {
  checked: boolean;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserRegisterModel {
  name: string;
  email: string;
  password: string;
}
