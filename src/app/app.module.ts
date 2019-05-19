import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MessagesComponent } from "./messages/messages.component";
import { ChannelsComponent } from "./channels/channels.component";

@NgModule({
  declarations: [AppComponent, MessagesComponent, ChannelsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
