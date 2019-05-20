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
  channelForm: FormGroup;
  channel: string = "";
  submitted: boolean = false;

  constructor(
    private tmijsService: TmijsService,
    private twitchapiService: TwitchapiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.channelForm = this.formBuilder.group(
      {
        channel: ["", Validators.required]
      },
      {}
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.channelForm.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.channelForm.value));
  }

  getJoinedChannels() {
    return this.tmijsService.getChannels();
  }

  getFollowedLiveStreams() {
    return this.twitchapiService.followedLiveStreams;
  }
}
