import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import {
//   MatButtonModule,
//   MatCheckboxModule,
//   MatRadioModule,
//   MatListModule,
//   MatSidenavModule,
//   MatCardModule,
//   MatFormFieldModule,
//   MatInputModule
// } from "@angular/material";

import { MaterialModule } from "./material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MessagesComponent } from "./messages/messages.component";
import { ChannelsComponent } from "./channels/channels.component";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root/root.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ChannelsComponent,
    LoginComponent,
    RootComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
