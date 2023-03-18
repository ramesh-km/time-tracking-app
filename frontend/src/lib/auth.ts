import { User } from "../types/users";
import { storageKeys } from "./storage-keys";

export function retriveUserFromLocalStorage() {
  const user = localStorage.getItem(storageKeys.authUser);
  let parsedUser = null;
  if (user) {
    try {
      parsedUser = JSON.parse(user) as User;
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      deleteUserFromLocalStorage();
      window.location.pathname = "/login";
    }
  }
  return parsedUser;
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem(storageKeys.authUser);
}
