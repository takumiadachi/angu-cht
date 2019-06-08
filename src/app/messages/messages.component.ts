import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { TmijsService, CONNECT } from "../tmijs.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit, AfterViewInit {
  messagesForm: FormGroup;
  message: string = "";
  @ViewChild("chatDiv") chatDiv: ElementRef;

  constructor(
    public tmijsService: TmijsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messagesForm = this.formBuilder.group(
      {
        // message: ["", Validators.required]
        message: []
      },
      {}
    );
  }

  ngAfterViewInit() {
    this.tmijsService.eventEmitter.on(CONNECT, () => {
      console.log(CONNECT);
      console.log(this.chatDiv);
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.messagesForm.invalid) {
      return;
    }

    this.tmijsService.say(
      this.tmijsService.currentChannel,
      this.messagesForm.get("message").value
    );

    this.messagesForm.get("message").setValue("");
  }
}
