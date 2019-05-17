import { Component } from "@angular/core";
import { environment } from "../environments/environment";

import * as tmi from "tmi.js";

let username: string = environment.twitch_username;
let password: string = environment.twitch_oauth_pass;
let clientId: string = environment.tmijs_clientId;

const options: tmi.Options = {
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
      console.log(message);
    }
  },
  options: {
    clientId: clientId,
    debug: true
  }
};

const client: tmi.Client = tmi.Client(options);

client.connect();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angu-cht";

  constructor() {}

  ngOnInit() {}
}
