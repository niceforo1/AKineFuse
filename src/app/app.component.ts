import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';

import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseNavigationModel } from './navigation/navigation.model';

@Component({
  selector: 'fuse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLogged: boolean = false;
  constructor(
    private fuseNavigationService: FuseNavigationService,
    private fuseSplashScreen: FuseSplashScreenService,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService,
    private _router: Router
  ) {
    // Add languages
    this.translate.addLangs(['en', 'tr']);

    // Set the default language
    this.translate.setDefaultLang('en');

    // Use a language
    this.translate.use('en');

    // Set the navigation model
    this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());
  }

  logged(event) {
    this.isLogged = event.isLogged;
    this._router.navigate(['/dashboard']);
  }
}
