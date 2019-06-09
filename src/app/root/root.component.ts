import { Component, OnInit, AfterViewInit } from "@angular/core";
import { StorestuffService } from "../storestuff.service";
import { AuthService } from "../auth.service";
import { TmijsService, CONNECT, MESSAGE_SENT } from "../tmijs.service";
import { TwitchapiService } from "../twitchapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit, AfterViewInit {
  constructor(
    private storeStuffService: StorestuffService,
    public tmijsService: TmijsService,
    private twitchApiService: TwitchapiService,
    private authService: AuthService,
    private router: Router
  ) {
    const access_token = this.authService.getAccessToken();
    this.authService
      .validateAccessToken(access_token)
      .then(valid_access_token => {
        if (valid_access_token) {
          // Everything is good, start the services.
          if (this.tmijsService.on === false) {
            this.tmijsService.start();
          }
          if (this.twitchApiService.on === false) {
            this.twitchApiService.start(this.authService.getAccessToken());
          }
        } else {
          // Throw the user back to the login.
          this.router.navigate(["/login"]);
          throw Error(`[${access_token}]. Token is invalid or does not exist.`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  ngOnInit() {
    console.log(this.storeStuffService.doSomethingAwesome());
  }

  ngAfterViewInit() {
    this.tmijsService.eventEmitter.on(CONNECT, () => {
      this.tmijsService.eventEmitter.on(MESSAGE_SENT, () => {});
    });
  }
}
