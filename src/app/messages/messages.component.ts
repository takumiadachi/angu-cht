import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2
} from "@angular/core";
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
  @ViewChild("chatDiv") chatDiv: ElementRef;

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
    let chatDiv = document.getElementById("chatDiv");
    this.tmijsService.eventEmitter.on(CONNECT, () => {
      // console.log(CONNECT);
      // console.log(this.chatDiv);

      console.log(chatDiv);
      this.tmijsService.eventEmitter.on(MESSAGE_SENT, () => {
        // this.chatDiv.nativeElement.scrollTop = 4000;

        // this.renderer.setProperty(
        //   this.chatDiv.nativeElement,
        //   "scrollTop",
        //   this.chatDiv.nativeElement.scrollHeight
        // );
        // console.log(this.chatDiv);
        console.log(chatDiv.scrollHeight);
        chatDiv.scrollTop = chatDiv.scrollHeight * 2;
        // console.log(chatDiv.scrollTop);
        // console.log(window.scrollY);
        // window.scrollTo(0, chatDiv.scrollHeight);
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
