export interface User {
  uid: string | undefined;
  email?: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  providerId?: string | null;
}

export interface AuthData {
  userName?: string;
  email: string;
  pwd: string;
}
