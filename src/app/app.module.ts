import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { DoctorModule } from './main/content/doctor/doctor.module';
import { PatientModule } from './main/content/patient/patient.module';
import { DialogModule } from './main/content/dialog/dialog.module'
import { TranslateModule } from '@ngx-translate/core';
import {Login2Module} from './main/login-2/login-2.module';
import {FuseProjectDashboardModule} from './main/content/dashboards/project/project.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'login-2'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
          delay             : 0,
          passThruUnknownUrl: true
        }),
        FuseMainModule,
        FuseSampleModule,
        FuseProjectDashboardModule,
        DoctorModule,
        PatientModule,
        DialogModule,
        Login2Module
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
