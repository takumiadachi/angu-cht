import { Component, OnInit, AfterViewInit, Renderer2 } from "@angular/core";
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
  scrolledBottom: boolean = true;
  scrollCount: number = 1;

  constructor(
    public tmijsService: TmijsService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
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
    this.renderer.listen(this.chatDiv, "scroll", evt => {
      this.checkIfBottom();
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
      const bottom = this.chatDiv.scrollHeight - this.chatDiv.clientHeight;

      // Keep scrolling bottom as messages come through if scrolledBottom boolean is true
      this.scrolledBottom ? this.chatDiv.scrollTo(0, bottom) : null;
    }
  }

  checkIfBottom() {
    if (this.chatDiv) {
      // Set scrolledBottom flag to true if at bottom and keep it there unless otherwise
      const bottom = this.chatDiv.scrollHeight - this.chatDiv.clientHeight;
      this.chatDiv.scrollTop === bottom
        ? (this.scrolledBottom = true)
        : (this.scrolledBottom = false);
    }
  }
}
