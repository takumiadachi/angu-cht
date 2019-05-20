import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import TwitchClient, { AccessToken } from "twitch";

const clientId: string = environment.twitch_clientId;
const accessToken: string = environment.twitch_access_token;
const clientSecret: string = environment.twitch_client_secret;
const refreshToken: string = environment.twitch_refresh_token;

@Injectable({
  providedIn: "root"
})
export class TwitchapiService {
  twitchClient: any;

  constructor() {
    this.initialize().then(() => {
      console.log("Initialized");
    });
  }

  async initialize() {
    this.twitchClient = await TwitchClient.withCredentials(
      clientId,
      accessToken,
      undefined,
      {
        clientSecret,
        refreshToken,
        onRefresh: (token: AccessToken) => {
          // do things with the new token data, e.g. save them in your database
          console.log(token);
        }
      }
    )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
