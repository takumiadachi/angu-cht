import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import TwitchClient, { AccessToken, User, Stream } from "twitch";
import UserAPI from "twitch/lib/API/Kraken/User/UserAPI";
import { client } from "tmi.js";

const clientId: string = environment.twitch_clientId;
const accessToken: string = environment.twitch_access_token;
const clientSecret: string = environment.twitch_client_secret;
const refreshToken: string = environment.twitch_refresh_token;

@Injectable({
  providedIn: "root"
})
export class TwitchapiService {
  twitchClient: TwitchClient;
  user: User;
  followedLiveStreams: Array<Stream>;

  constructor() {
    TwitchClient.withCredentials(clientId, accessToken, undefined, {
      clientSecret,
      refreshToken,
      onRefresh: (token: AccessToken) => {
        // do things with the new token data, e.g. save them in your database
        // Apparently this feature is not active yet and access tokens last forever until revoked.
        // console.log(token);
      }
    })
      .then(client => {
        this.twitchClient = client;
        // console.log(data);
        console.log(this.twitchClient);
        this.twitchClient.kraken.streams
          .getFollowedStreams()
          .then(followedLiveChannels => {
            this.followedLiveStreams = followedLiveChannels;
            console.log(this.followedLiveStreams);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
