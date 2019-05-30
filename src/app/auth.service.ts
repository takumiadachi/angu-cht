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

  generateNonce(stringLength) {
    var randomString = ""; // Empty value of the selective variable
    const allCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // listing of all alpha-numeric letters
    while (stringLength--) {
      randomString += allCharacters.substr(
        Math.floor(Math.random() * allCharacters.length + 1),
        1
      ); // selecting any value from allCharacters varible by using Math.random()
    }
    return randomString; // returns the generated alpha-numeric string
  }

  /**
   * Clears cookies.
   */
  clear() {
    Cookies.remove("twitch_username");
    Cookies.remove("twitch_oauth");
  }
}
