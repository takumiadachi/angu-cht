import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MessagesComponent } from "./messages/messages.component";
import { ChannelsComponent } from "./channels/channels.component";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ChannelsComponent,
    LoginComponent,
    RootComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
