import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShopComponent } from "./shop/shop.component";
import { PagesComponent } from "./pages/pages.component";
import { TrackorderComponent } from "./trackorder/trackorder.component";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "",
  //   pathMatch: "full",
  // },
  // {
  //   path: "",
  //   redirectTo: "home/marijuana",
  //   pathMatch: "full",
  // },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "",
    component: ShopComponent,
    loadChildren: () => import("./shop/shop.module").then((m) => m.ShopModule),
  },
  {
    path: "pages",
    component: PagesComponent,
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "trackorder",
    component: TrackorderComponent,
    loadChildren: () =>
      import("./trackorder/trackorder.module").then((m) => m.TrackorderModule),
  },
  {
    path: "trackorder/:id",
    component: TrackorderComponent,
    loadChildren: () =>
      import("./trackorder/trackorder.module").then((m) => m.TrackorderModule),
  },
  {
    path: "**", // Navigate to Home Page if not found any page
    redirectTo: "",
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      useHash: false,
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
