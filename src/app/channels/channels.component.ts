import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";
import { ErrorStateMatcher } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";

import { TwitchapiService } from "../twitchapi.service";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.scss"]
})
export class ChannelsComponent implements OnInit {
  channelsForm: FormGroup;
  channel: string = "";
  showChannels: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    public tmijsService: TmijsService,
    private twitchapiService: TwitchapiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.channelsForm = this.formBuilder.group(
      {
        // channel: ["", Validators.required]
        channel: []
      },
      {}
    );
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.channelsForm.invalid) {
      return;
    }

    this.tmijsService.joinChannel(this.channelsForm.value.channel);

    this.channelsForm.get("channel").setValue(" ");
  }

  selectChannel(channel: string) {
    this.tmijsService.setCurrentChannel(channel);
  }

  getJoinedChannels() {
    return this.tmijsService.getChannels();
  }

  copyTo(value: string, form: string) {
    let payload = {};
    payload[form] = value;
    if (this.channelsForm) {
      this.channelsForm.setValue(payload);
    }
  }

  joinChannel(channel: string) {
    this.tmijsService.joinChannel(channel);
  }

  toggleShowChannels() {
    this.showChannels = !this.showChannels;
  }

  getFollowedLiveStreams() {
    return this.twitchapiService.followedLiveStreams;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
