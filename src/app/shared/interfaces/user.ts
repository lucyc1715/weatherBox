export interface User {
  uid: string;
  email?: string | null;
  photoURL?: string | null;
  displayName?: string | null;
}

export interface AuthData {
  userName?: string;
  email: string;
  pwd: string;
}
