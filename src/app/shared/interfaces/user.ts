export interface User {
  uid: string | undefined;
  email?: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  providerId?: string | null;
  link?: string;
}

export interface AuthData {
  userName?: string;
  email: string;
  pwd: string;
}
