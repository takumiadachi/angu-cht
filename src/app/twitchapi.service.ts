import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import TwitchClient, {
  AccessToken,
  User,
  Stream,
  PrivilegedUser
} from "twitch";
import UserAPI from "twitch/lib/API/Kraken/User/UserAPI";
import { client } from "tmi.js";
import ChatBadgeList from "twitch/lib/API/Badges/ChatBadgeList";

const clientId: string = environment.twitch_clientId;
const accessToken: string = environment.twitch_access_token;
const clientSecret: string = environment.twitch_client_secret;
const refreshToken: string = environment.twitch_refresh_token;

@Injectable({
  providedIn: "root"
})
export class TwitchapiService {
  twitchClient: TwitchClient;
  followedLiveStreams: Array<Stream>;
  user: PrivilegedUser;
  globalBadgeList: ChatBadgeList;

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
          })
          .catch(error => {
            this.followedLiveStreams = null;
            console.error(error);
          });
        this.twitchClient.users
          .getMe()
          .then(user => {
            this.user = user;
            console.log(this.user);
          })
          .catch(error => {
            this.user = null;
            console.error(error);
          });
        this.twitchClient.badges
          .getGlobalBadges()
          .then(globalbadges => {
            this.globalBadgeList = globalbadges;
            console.log(globalbadges);
          })
          .catch(error => {
            this.globalBadgeList = null;
            console.error(error);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
