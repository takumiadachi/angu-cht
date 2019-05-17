import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  constructor(public tmijsService: TmijsService) {}

  ngOnInit() {}
}
