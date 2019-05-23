import { Injectable } from "@angular/core";
import Cookies from "js-cookie";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  setAuth(username, oauth) {
    Cookies.set("auth", { username: username, oauth: oauth });
  }

  getCookies() {
    return Cookies.getJSON("auth");
  }

  getUsername() {
    return Cookies.getJSON("auth").username;
  }

  getOAuth() {
    return Cookies.getJSON("auth").oauth;
  }

  /**
   * Clears cookies.
   */
  clear() {
    Cookies.remove("twitch_username");
    Cookies.remove("twitch_oauth");
  }
}
