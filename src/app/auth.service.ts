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

  /**
   * Clears cookies.
   */
  clear() {
    Cookies.remove("twitch_username");
    Cookies.remove("twitch_oauth");
  }
}
