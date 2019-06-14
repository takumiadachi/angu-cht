import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TmijsService, CONNECT, MESSAGE_SENT } from "../tmijs.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit, AfterViewInit {
  messagesForm: FormGroup;
  message: string = "";
  chatDiv: HTMLElement;
  scrollBottom: boolean;

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
    // Set the chat div element so we can scroll it.
    this.chatDiv = document.getElementById("chatDiv");
    this.tmijsService.eventEmitter.on(CONNECT, () => {
      this.tmijsService.eventEmitter.on(MESSAGE_SENT, data => {
        // console.log(data);
      });
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

  scrollToBottom() {
    if (this.chatDiv) {
      const scrolledBottom =
        this.chatDiv.scrollHeight - this.chatDiv.clientHeight;

      console.log(`${this.chatDiv.scrollTop} ${scrolledBottom}`);

      // Keep scrolled bottom if already scrolled bottom.
      if (this.chatDiv.scrollTop === scrolledBottom) {
        this.chatDiv.scrollTo(
          0,
          this.chatDiv.scrollHeight - this.chatDiv.clientHeight
        );
      }
    }
  }
}
