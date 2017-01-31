import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

//Mock web service that will simulate a web server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroesComponent } from "./heroes.component";
import { DashboardComponent } from "./dashboard.component";
import { HeroSearchComponent } from "./hero-search.component";

import { HeroService } from "./hero.service";//We need this for service injection
import { HeroSearchService } from "./hero-search.service";

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroSearchComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    providers: [HeroService, HeroSearchService], //We need this for service injection
    bootstrap: [AppComponent]
})
export class AppModule { }
