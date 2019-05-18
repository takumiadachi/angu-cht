# AnguCht

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

This is a Twitch Chat application created using tmi.js and Angular 7.

[![Netlify Status](https://api.netlify.com/api/v1/badges/dfc1648a-81d2-4987-888c-77947ccb840d/deploy-status)](https://app.netlify.com/sites/elastic-borg-0e66e5/deploys)

## Development server

Copy ./src/environment/environtment.ts to ./src/environment/environment.dev.ts and replace:

```
export const environment = {
  production: false,
  name: name,
  twitch_username: "username",
  twitch_oauth_pass: "password",
  tmijs_clientId: "clientid"
};
```

With

```
export const environment = {
  production: false,
  name: "dev",
  twitch_username: "YOUR USERNAME",
  twitch_oauth_pass: "YOUR PASSWORD",
  tmijs_clientId: "YOUR CLIENTID"
};
```

Then

Run `ng serve --configuration dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

or Run `ng serve --configuration development --host 0.0.0.0 --publicHost xxx.xxx.xxx.xxx` if you want to use another computer to debug.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

<!--
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
