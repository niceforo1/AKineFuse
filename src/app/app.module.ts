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
import { DoctorModule } from './main/content/doctor/doctor.module';
import { PatientModule } from './main/content/patient/patient.module';
import { SettingModule } from './main/content/setting/setting.module';
import { DialogModule } from './main/content/dialog/dialog.module';
import { DialogSocInsModule } from './main/content/socialInsurance/dialogSocIns.module';
import { AlertModule } from './main/content/alerts/alert.module';
import { LoginModule } from './main/content/login/login.module';
import { TranslateModule } from '@ngx-translate/core';
import { FuseProjectDashboardModule } from './main/content/dashboards/project/project.module';

const appRoutes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    TranslateModule.forRoot(),
    FuseMainModule,
    FuseProjectDashboardModule,
    DoctorModule,
    PatientModule,
    DialogModule,
    DialogSocInsModule,
    AlertModule,
    LoginModule
  ],
  providers: [
    FuseSplashScreenService,
    FuseConfigService,
    FuseNavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
