export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  isViewer?: boolean;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin?: boolean;
}