import { Component, OnInit, AfterViewInit, Renderer2 } from "@angular/core";
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
  matDrawerInnerContainer: Element;

  constructor(
    private storeStuffService: StorestuffService,
    public tmijsService: TmijsService,
    private twitchApiService: TwitchapiService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
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
    this.matDrawerInnerContainer = document.getElementsByClassName(
      "mat-drawer-inner-container"
    )[0];
    console.log(this.matDrawerInnerContainer);
    // Add custom scrollbar one level deep past mat-drawer-container
    this.matDrawerInnerContainer.className += " custom-scrollbar";
  }
}
