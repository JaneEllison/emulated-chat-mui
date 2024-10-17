import { create } from 'zustand';
import { Contact } from "../server/types.ts";

const storageKey = 'loggedUser';

type AuthState = {
  readonly isAuthorized: boolean;
  user: Contact | null
}

type AuthActions = {
  logIn(userData: Contact): void;
  logOut(): void;
}

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  get isAuthorized() {
    return !!this.user;
  },
  user: getUserData(),
  logIn(userData: Contact) {
    set(state => ({ ...state, isAuthorized: true, user: userData }));
    localStorage.setItem(storageKey, JSON.stringify(userData));
  },
  logOut() {
    set(state => ({ ...state, isAuthorized: false, user: null }));
    localStorage.removeItem(storageKey);
  }
}));

function getUserData(): Contact | null {
  let data: Contact | null = null;

  try {
    data = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
  } catch {}

  return data;
}