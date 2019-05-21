import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Message } from "./messages/message";

import * as tmi from "tmi.js";

const username: string = environment.twitch_username;
const password: string = environment.twitch_oauth_pass;
const clientId: string = environment.twitch_clientId;

let devOptions: tmi.Options = {
  channels: ["#absnerdity"],
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
    password: password,
    username: username
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
    clientId: clientId,
    debug: true
  }
};

@Injectable({
  providedIn: "root"
})
export class TmijsService {
  messages: Message[] = [];
  client: tmi.Client;
  currentChannel: string;

  constructor() {
    console.log(environment.name);
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

    this.client.connect().then(data => {
      console.log(data);
      this.client.on("message", (channel, userstate, messageText, self) => {
        // Don't listen to my own messages..
        if (self) return;

        // Handle different message types..
        switch (userstate["message-type"]) {
          case "action":
            // This is an action message..
            break;
          case "chat":
            // This is a chat message..
            const message: Message = {
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
            console.log(this.messages);
            this.addMessage(message);
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
        // console.log(`${username} joined ${channel}`);
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
   * Get channels.
   *
   */
  getChannels(): string[] {
    return this.client.getChannels();
  }

  /**
   * Clear messages
   *
   */
  clear() {
    this.messages = [];
  }
}
