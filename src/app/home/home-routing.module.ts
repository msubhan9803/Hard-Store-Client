import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MarijuanaComponent } from "./marijuana/marijuana.component";

const routes: Routes = [
  {
    path: "uaeslimmers",
    component: MarijuanaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
