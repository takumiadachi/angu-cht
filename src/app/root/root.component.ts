import { Component, OnInit } from "@angular/core";
import { StorestuffService } from "../storestuff.service";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {
  constructor(private storeStuffService: StorestuffService) {}

  ngOnInit() {
    console.log(this.storeStuffService.doSomethingAwesome());
  }
}
