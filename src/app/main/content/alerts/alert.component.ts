import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

@Component({
  template: `
        `
})
export class AlertComponent {
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
  errorDuplicado: any;
  successProfessional: any;
  successPatient: any;
  genericError: any;
  genericDeleteOk: any;

  constructor(public snackBar: MatSnackBar, private _router: Router) {
    this.horizontalPosition = 'center';
    this.verticalPosition = 'top';

    this.errorDuplicado = {
      message: 'Ya se encuentra registrada una persona con el DNI ingresado.'
    };
    this.successProfessional = {
      message: 'El profesional fue guardado correctamente.',
      navigate: '/list-doctors'
    };
    this.successPatient = {
      message: 'El paciente fue guardado correctamente.',
      navigate: '/list-patients'
    };
    this.genericError = {
      message: 'Se ha producido un error, intente nuevamente.'
    };
    this.genericDeleteOk = {
      message: 'El registro fue borrado correctamente.'
    };
  }

  openErrorSnackBar(config: any) {
    this.snackBar.open(config.message, null, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['errorSnackBar']
    });
  }

  openCustomMsgErrorSnackBar(message: any) {
    this.snackBar.open(message, null, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['errorSnackBar']
    });
  }

  openSuccessSnackBar(config: any) {
    this.snackBar.open(config.message, null, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['successSnackBar']
    });
    if (config.navigate) {
      this._router.navigate([config.navigate]);
    }
  }
}
