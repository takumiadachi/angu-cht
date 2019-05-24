import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { TmijsService } from "../tmijs.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public tmijsService: TmijsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        username: [environment.twitch_username],
        password: [environment.twitch_oauth_pass]
      },
      {}
    );
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
      this.router.navigate(["/"]);
    });
  }
}
