import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required]
      },
      {}
    );
  }

  login(event: any) {}

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;
    console.log(username, password);
    this.authService.setAuth(username, password);
    console.log(this.authService.getCookies());
  }
}
