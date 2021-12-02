import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { MarijuanaComponent } from "./marijuana/marijuana.component";

const routes: Routes = [
  {
    path: "hardtaker",
    component: LandingPageComponent,
  },
  {
    path: "marijuana",
    component: MarijuanaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
