import { DialogComponentSocIns } from './dialog-add-SocIns.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { SocialInsurance } from '../../models/SocialInsurance';

@Component({
  template: ``,
  providers: [DialogComponentSocIns]
})
export class DialogConfigSocInsComponent {
  config: any;
  socialInsurance = new SocialInsurance();

  constructor(public dialog: MatDialog, private _router: Router) {
    this.config = {
      title: 'Agregar Obra social.'
    };
  }


  openDialog(config: any) {
    const dialogRef = this.dialog.open(DialogComponentSocIns, {
      data: {
        title: config.title
      }
    });
    return dialogRef;
  }
}
