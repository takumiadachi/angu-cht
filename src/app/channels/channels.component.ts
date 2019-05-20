import { Component, OnInit } from "@angular/core";
import { TmijsService } from "../tmijs.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

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
    public tmijsService: TmijsService,
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
}
