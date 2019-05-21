import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
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

  constructor(
    private tmijsService: TmijsService,
    private twitchapiService: TwitchapiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.channelsForm = this.formBuilder.group(
      {
        channel: ["", Validators.required]
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
  }

  getJoinedChannels() {
    return this.tmijsService.getChannels();
  }

  getFollowedLiveStreams() {
    return this.twitchapiService.followedLiveStreams;
  }
}
