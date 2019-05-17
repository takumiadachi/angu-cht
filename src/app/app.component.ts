import { Component } from "@angular/core";
import { TmijsService } from "./tmijs.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angu-cht";

  constructor(private tmijsService: TmijsService) {
    // Called first time before the ngOnInit()
  }

  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges()
  }
}
