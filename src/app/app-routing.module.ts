import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root/root.component";

const routes: Routes = [
  { path: "client", component: RootComponent },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
