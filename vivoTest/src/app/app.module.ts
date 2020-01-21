import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import * as $ from 'jquery';
import "materialize-css";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListfilmsComponent } from './shared/listfilms/listfilms.component';
import { FooterComponent } from './shared/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListfilmsComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
