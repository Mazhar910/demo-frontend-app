import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { MomentModule } from "ngx-moment";
import { PublicLayoutComponent } from "./public-layout/public-layout.component";
import { AsideNavbarComponent } from "./aside-navbar/aside-navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { PublicTopNavbarComponent } from "./public-top-navbar/public-top-navbar.component";
import { SettingsNavbarComponent } from "./settings-navbar/settings-navbar.component";
import { SearchLayoutComponent } from './search-layout/search-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, MomentModule],
  declarations: [
    SettingsNavbarComponent,
    AdminLayoutComponent,
    PublicLayoutComponent,
    AsideNavbarComponent,
    FooterComponent,
    TopNavbarComponent,
    PublicTopNavbarComponent,
    SearchLayoutComponent,
  ],
  exports: [
    SettingsNavbarComponent,
    AdminLayoutComponent,
    PublicLayoutComponent,
    AsideNavbarComponent,
    FooterComponent,
    TopNavbarComponent,
    PublicTopNavbarComponent,
    RouterModule
  ]
})
export class LayoutModule {}
