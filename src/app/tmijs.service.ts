import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Message } from "./messages/message";

import * as tmi from "tmi.js";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TmijsService {
  messages: Array<Message> = [];
  client: tmi.Client;
  currentChannel: string = "";

  constructor(private authService: AuthService) {
    this.start().then(data => {
      console.log(data);
    });
  }

  async start() {
    let devOptions: tmi.Options = {
      channels: ["#goati_", "#perpetualmm", "#absnerdity"],
      connection: {
        maxReconnectAttempts: 2,
        maxReconnectInverval: 10,
        reconnect: true,
        reconnectDecay: 20,
        reconnectInterval: 10,
        secure: true,
        timeout: 20
      },
      identity: {
        username: this.authService.getUsername()
          ? this.authService.getUsername()
          : // : null,
            environment.twitch_username,

        password: this.authService.getOAuth()
          ? this.authService.getOAuth()
          : // : null
            environment.twitch_oauth_pass
      },
      logger: {
        warn: message => {
          console.log(message);
        },
        error: message => {
          console.log(message);
        },
        info: message => {
          // console.log(message);
        }
      },
      options: {
        clientId: environment.twitch_clientId,
        debug: true
      }
    };

    switch (environment.name) {
      case "prod":
        this.client = tmi.Client({
          channels: ["#Monstercat"],
          connection: {
            maxReconnectAttempts: 2,
            maxReconnectInverval: 10,
            reconnect: true,
            secure: true
          }
        }); //Monstercat is a 24/7 music channel.
        break;
      case "dev":
        this.client = tmi.Client(devOptions);
        break;
      default:
        this.client = tmi.Client({
          channels: ["#Monstercat"],
          connection: {
            maxReconnectAttempts: 2,
            maxReconnectInverval: 10,
            reconnect: true,
            secure: true
          }
        });
    }

    await this.client
      .connect()
      .then(data => {
        this.client.on("message", (channel, userstate, messageText, self) => {
          // Don't listen to my own messages..
          if (self) return;
          let message: Message = {
            badges: userstate["badges"],
            color: userstate["color"],
            "display-name": userstate["display-name"],
            emotes: userstate["emotes"],
            mod: userstate["mod"],
            "room-id": userstate["room-id"],
            subscriber: userstate["subscriber"],
            turbo: userstate["turbo"],
            "user-id": userstate["user-id"],
            "user-type": userstate["user-type"],
            "emotes-raw": userstate["emotes-raw"],
            "badges-raw": userstate["badges-raw"],
            "message-type": userstate["message-type"],
            username: userstate["username"],
            message: messageText,
            channel: channel
          };
          // Handle different message types..
          switch (userstate["message-type"]) {
            case "action":
              // This is an action message..
              this.addMessage(message);
              // console.log(this.messages); // Keep this commented unless you want to see a ton of messages.
              break;
            case "chat":
              this.addMessage(message);
              // console.log(this.messages); // Keep this commented unless you want to see a ton of messages.
              break;
            case "whisper":
              // This is a whisper..
              break;
            default:
              // Something else ?
              break;
          }
        });
        this.client.on("join", (channel, username, self) => {
          if (this.client.getUsername() === username) {
            !this.currentChannel ? (this.currentChannel = channel) : ""; // Set current channel to the first one joined on first connection.
            console.log(`${username} (You) joined ${channel}`);
          }
        });
        this.client.on("logon", () => {
          console.log(`You are logged in as ${this.client.getUsername()}`);
        });
        this.client.on("connected", (address, port) => {
          const m: Message = {
            channel: `_root`,
            message: `Connected to${address}:${port}`
          };
          this.addMessage(m);
        });
        this.client.on("disconnected", reason => {
          let m: Message;
          reason
            ? (m = {
                channel: `_root`,
                message: `Disconnected. Reason: ${reason}`
              })
            : (m = {
                channel: `_root`,
                message: `Disconnected.`
              });

          this.addMessage(m);
        });
        this.client.on("hosted", (channel, username, viewers, autohost) => {
          console.log(channel, username, viewers, autohost);
          // Do your stuff.
        });
        this.client.on("hosting", (channel, target, viewers) => {
          console.log(channel, target, viewers);
          // Do your stuff.
        });
        console.log(data);
        return data;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  stop() {
    this.client
      .disconnect()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Send message to channel.
   *
   * @param channel
   * @param message
   */
  say(channel: string, message: string) {
    this.client
      .say(channel, message)
      .then(data => {
        const m: Message = {
          channel: channel,
          username: this.client.getUsername(),
          message: message
        };
        this.messages.push(m);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  /**
   * Join a channel. E.g #Goati_
   *
   * @param channel
   */
  joinChannel(channel: string) {
    if (this.client) {
      this.client
        .join(channel)
        .then(data => {
          console.log(`Joined channel ${channel}.`);
          console.log(data);
          return true;
        })
        .catch(err => {
          console.error(err);
          return false;
        });
    }
  }

  /**
   * Leave channel.
   *
   * @param channel
   */
  leaveChannel(channel: string) {
    if (this.client) {
      this.client
        .part(channel)
        .then(data => {
          console.log(`Left channel ${channel}.`);
          return true;
        })
        .catch(err => {
          console.error(err);
          return false;
        });
    }
  }

  /**
   * Get channels.
   *
   */
  getChannels(): string[] {
    return this.client.getChannels();
  }

  /**
   * Set current channel to chat in.
   *
   * @param channel
   */
  setCurrentChannel(channel: string): void {
    this.currentChannel = channel;
  }

  /**
   * Get messages.
   *
   */
  getMessages(): Array<Message> {
    return this.messages;
  }

  /**
   * Clear messages
   *
   */
  clear() {
    this.messages = [];
  }
}
