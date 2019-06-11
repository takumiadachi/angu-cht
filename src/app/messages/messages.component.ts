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
    let chatDiv = document.getElementById("chatDiv");
    this.tmijsService.eventEmitter.on(CONNECT, () => {
      this.tmijsService.eventEmitter.on(MESSAGE_SENT, () => {
        // chatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
        // if (chatDiv.scrollTop >= chatDiv.scrollHeight) {
        //   console.log(chatDiv.scrollTop, chatDiv.scrollHeight);
        //   // if the scroll is already at the bottom, scroll down
        // chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
        console.log(
          `scrltop: ${chatDiv.scrollTop} vs scrlhei: ${chatDiv.scrollHeight -
            chatDiv.clientHeight} vs clihei: ${chatDiv.clientHeight}`
        );
        chatDiv.scrollTo(0, chatDiv.scrollHeight - chatDiv.clientHeight);
        // chatDiv.scrollBy(0, chatDiv.scrollHeight + 17);
        // }
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
}
