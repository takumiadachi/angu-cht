import { Injectable } from "@angular/core";
import Cookies from "js-cookie";
import axios from "axios";
import { environment } from "src/environments/environment";

const OAUTH_URL: string = "https://id.twitch.tv/oauth2/"; // Change this if twitch's API changes
const OAUTH_REVOKE: string = "revoke";
const OAUTH_AUTHORIZE: string = "authorize";
const OAUTH_VALIDATE: string = "validate";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  AUTH: string = "auth";

  constructor() {}

  setAuth(
    username?: string,
    access_token?: string,
    oauth?: string,
    nonce?: string
  ) {
    Cookies.set(this.AUTH, {
      username: username,
      oauth: oauth,
      nonce: nonce,
      access_token: access_token
    });
  }

  getCookies() {
    return Cookies.getJSON(this.AUTH) ? Cookies.getJSON(this.AUTH) : undefined;
  }

  getUsername() {
    return Cookies.getJSON(this.AUTH)
      ? Cookies.getJSON(this.AUTH).username
      : undefined;
  }

  getOAuth() {
    return Cookies.getJSON(this.AUTH)
      ? Cookies.getJSON(this.AUTH).oauth
      : undefined;
  }

  getNonce() {
    return Cookies.getJSON(this.AUTH)
      ? Cookies.getJSON(this.AUTH).nonce
      : undefined;
  }

  getAccessToken() {
    return Cookies.getJSON(this.AUTH)
      ? Cookies.getJSON(this.AUTH).access_token
      : undefined;
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
    Cookies.remove("twitch_access_token");
  }

  /**
   * Validate Twitch access token. Returns a promise: true or false.
   *
   * @param access_token
   */
  validateAccessToken(access_token: string): Promise<any> {
    let promise: Promise<any> = new Promise(resolve => {
      axios({
        method: "get",
        url: `${OAUTH_URL}${OAUTH_VALIDATE}`, // 'https://id.twitch.tv/oauth2/validate'
        headers: { Authorization: `OAuth ${access_token}` }
      })
        .then(response => {
          const valid = response.status === 200 ? true : false;
          const data = response.data;
          const res = { valid: valid, data: data };
          resolve(valid);
        })
        .catch(error => {
          console.error(
            `[${access_token}]. Token is invalid or does not exist.`
          );
          resolve(error);
        });
    });

    return promise;
  }

  /**
   * Get a Twitch user object of the access token. Useful for getting user name and email.
   */
  getUserObject(access_token?: string): Promise<any> {
    let promise = new Promise(resolve => {
      axios({
        method: "get",
        url: `https://api.twitch.tv/kraken/user/`,
        headers: {
          Authorization: `OAuth ${
            access_token ? access_token : this.getAccessToken()
          }`,
          Accept: `application/vnd.twitchtv.v5+json`,
          "Client-ID": `v46986rq8azaksvs007x1jtowesv4d`
        }
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          resolve(error);
        });
    });

    return promise;
  }

  /**
   * Revoke Twitch access token. Returns a promise: true or false.
   *
   * @param access_token
   * @param client_id
   */
  revokeAccessTokenPOST(access_token: string, client_id: string): Promise<any> {
    let promise = new Promise(resolve => {
      axios({
        method: "post",
        url: `${OAUTH_URL}${OAUTH_REVOKE}`, // 'https://id.twitch.tv/oauth2/revoke'
        params: {
          client_id: client_id,
          token: access_token
        }
      })
        .then(response => {
          console.log(`${access_token} successfully revoked.`);
          resolve(response);
        })
        .catch(error => {
          console.error(
            `[${access_token}]. Token is invalid or does not exist.`
          );
          resolve(error);
        });
    });

    return promise;
  }

  /**
   * Generate a Twitch login URL to get a access token.
   *
   * @param nonce
   */
  generateAccessTokenURL(nonce?: string) {
    return `${OAUTH_URL}${OAUTH_AUTHORIZE}
?client_id=${environment.twitch_clientId}
&redirect_uri=${environment.twitch_redirect_uri}
&response_type=token
&scope=chat%3Aread+chat%3Aedit+channel%3Amoderate+whispers%3Aread+whispers%3Aedit+channel_editor+user_read
&nonce=${nonce}`;
  }
}
//+chat:edit+chat:read+whispers:read+whispers:edit
