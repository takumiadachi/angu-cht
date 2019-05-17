import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

import * as tmi from "tmi.js";

let username: string = environment.twitch_username;
let password: string = environment.twitch_oauth_pass;
let clientId: string = environment.tmijs_clientId;

@Injectable({
  providedIn: "root"
})
export class TmijsService {
  messages: string[] = [];

  options: tmi.Options = {
    channels: ["#Starcraft"],
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
        console.log(message);
      }
    },
    options: {
      clientId: clientId,
      debug: true
    }
  };

  client: tmi.Client = tmi.Client(this.options);

  constructor() {
    this.client.connect();
  }

  addMessage(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
