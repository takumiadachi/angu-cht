import { Component } from "@angular/core";
import { TmijsService } from "./tmijs.service";
import { TwitchapiService } from "./twitchapi.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string = "angu-cht";
  channel: string = "";

  constructor(
    private tmijsService: TmijsService,
    private twitchapiService: TwitchapiService
  ) {
    // Called first time before the ngOnInit()
  }

  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges()
  }
}
