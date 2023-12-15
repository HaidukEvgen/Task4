export interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  status: string;
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
