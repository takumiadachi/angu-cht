import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.scss"]
})
export class ChannelsComponent implements OnInit {
  constructor(public tmijsService: TmijsService) {}

  ngOnInit() {}
}
