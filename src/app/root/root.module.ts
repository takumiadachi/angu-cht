import { NgModule } from "@angular/core";
import { MessagesComponent } from "../messages/messages.component";
import { ChannelsComponent } from "../channels/channels.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [MessagesComponent, ChannelsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule]
})
export class AppModule {}
