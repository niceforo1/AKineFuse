import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  template: ``,
  providers: [DialogComponent]
})
export class DialogConfigComponent {
  dialogGuardarDoctor: any;
  dialogGuardarPatient: any;
  dialogGuardarSocialInsurance: any;
  dialogDuplicadoDni: any;
  dialogConfirmBorrar: any;
  dialogErrorGenerico: any;

  constructor(public dialog: MatDialog, private _router: Router) {
    this.dialogGuardarDoctor = {
      title: 'Guardar',
      message: 'El profesional ha sido guardado correctamente.',
      btnCancelar: 'false',
      type: 'G',
      navigate: '/list-doctors'
    };
    this.dialogGuardarPatient = {
      title: 'Guardar',
      message: 'El paciente ha sido guardado correctamente.',
      btnCancelar: 'false',
      type: 'G',
      navigate: '/list-patients'
    };
    this.dialogGuardarSocialInsurance = {
      title: 'Guardar',
      message: 'La Obra Social ha sido guardado correctamente.',
      btnCancelar: 'false',
      type: 'G',
      navigate: '/list-social-insurances'
    };

    this.dialogDuplicadoDni = {
      title: 'Error',
      message: 'Ya se encuentra registrada una persona con el DNI ingresado.',
      btnCancelar: 'false',
      type: 'E'
    };
    this.dialogConfirmBorrar = {
      title: 'Confirmar',
      message: '¿Está seguro de que desea borrar este registro?.',
      btnCancelar: 'true',
      type: 'C'
    };
    this.dialogErrorGenerico = {
      title: 'Error',
      message: 'Se ha producido un error, intente nuevamente.',
      btnCancelar: 'false',
      type: 'E'
    };
  }

  openDialog(config: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: config.title,
        message: config.message,
        btnCancelar: config.btnCancelar
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (config.type != 'E' && config.navigate) {
        this._router.navigate([config.navigate]);
      }
    });
  }

  openConfirmDialog(config: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: config.title,
        message: config.message,
        btnCancelar: config.btnCancelar
      }
    });
    return dialogRef;
  }
}
