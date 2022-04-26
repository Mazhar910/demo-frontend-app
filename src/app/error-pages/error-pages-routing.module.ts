import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";
import { InternalServerErrorComponent } from "./internal-server-error/internal-server-error.component";
import { AdminLayoutComponent } from "../layout/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "404", component: NotFoundComponent },
      { path: "403", component: NotAllowedComponent },
      { path: "500", component: InternalServerErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule {}
