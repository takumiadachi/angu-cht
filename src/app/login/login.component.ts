import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { URLSearchParams } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
// Services
import { AuthService } from "../auth.service";
import { TmijsService } from "../tmijs.service";
import { TwitchapiService } from "../twitchapi.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  accessTokenUrl: string;
  location: Location;

  constructor(
    public tmijsService: TmijsService,
    private twitchApiService: TwitchapiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    location: Location
  ) {
    this.location = location;
    let urlParams = new URLSearchParams(location.path(true));
    console.log(urlParams);
    let access_token = null;
    try {
      access_token = urlParams.paramsMap.get("/login#access_token")[0]
        ? urlParams.paramsMap.get("/login#access_token")[0]
        : null;
    } catch (error) {
      console.log(error);
    }

    let authenticate = access_token => {
      this.authService
        .validateAccessToken(access_token)
        .then(valid_access_token => {
          if (valid_access_token) {
            return Promise.all([
              this.authService.getUserObject(access_token),
              access_token,
              valid_access_token
            ]);
          } else {
            throw Error(
              `[${access_token}]. Token is invalid or does not exist.`
            );
          }
        })
        .then(([userObject, access_token, valid]) => {
          const username: string = userObject.data.display_name;
          this.authService.setAuth(username, access_token, access_token);
          console.log(this.authService.getCookies());
          // Gather everything, start services, then finally log in
          this.tmijsService.start().then(data => {
            this.twitchApiService.start(this.authService.getAccessToken());
            this.router.navigate(["/client"]);
          });
        })
        .catch(error => {
          console.error(error);
        });
    };

    if (access_token) {
      authenticate(access_token);
    } else {
      console.error("There is no valid access token.");
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        username: [environment.twitch_username],
        password: [environment.twitch_oauth_pass]
      },
      {}
    );

    this.accessTokenUrl = this.authService.generateAccessTokenURL();
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;

    this.authService.setAuth(username, password);
    this.tmijsService.start().then(data => {
      this.router.navigate(["/client"]);
    });
    this.twitchApiService.start(environment.twitch_access_token);
  }
}
