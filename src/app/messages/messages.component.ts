import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  messagesForm: FormGroup;
  message: string = "";

  constructor(
    public tmijsService: TmijsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messagesForm = this.formBuilder.group(
      {
        message: ["", Validators.required]
      },
      {}
    );
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.messagesForm.invalid) {
      return;
    }

    this.tmijsService.say(
      "#absnerdity",
      this.messagesForm.get("message").value
    );

    this.messagesForm.get("message").setValue(" ");
  }
}
