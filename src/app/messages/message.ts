import { Badges } from "tmi.js";

export class Message {
  // Required
  username: string; //'schmoopiie'
  message: string;
  // Optional
  badges?: Badges; //{ 'broadcaster': '1', 'warcraft': 'horde' }
  color?: string; //'#FFFFFF'
  "display-name"?: string; //'Schmoopiie'
  emotes?: { [emoteid: string]: string[] }; //{ '25': [ '0-4' ] }
  mod?: boolean; //true
  "room-id": string; //'58355428'
  subscriber?: boolean; //false
  turbo?: boolean; //true
  "user-id"?: string; //'58355428'
  "user-type"?: "" | "mod" | "global_mod" | "admin" | "staff"; //'mod'
  "emotes-raw"?: string; //'25:0-4'
  "badges-raw"?: string; //'broadcaster/1,warcraft/horde'
  "message-type"?: string; //'action'
  channel?: string; //#starcraft
}
