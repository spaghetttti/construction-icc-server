export interface User {
  id: number;
  username: string;
  password: string;
  role: Roles;
}

export type Roles =
  | 'warehouse_manager'
  | 'foreman'
  | 'manager'
  | 'administrator'
  | 'accountant';
