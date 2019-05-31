import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
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
