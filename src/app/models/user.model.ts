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
