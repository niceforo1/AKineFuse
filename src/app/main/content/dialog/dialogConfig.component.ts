import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  providers: [
    DialogComponent
  ]
})

export class DialogConfigComponent
{
  dialogError : any;
  dialogGuardar : any;
  dialogDuplicado : any;
  dialogConfirm : any;

  constructor(public dialog: MatDialog, private _router: Router)
    {
      this.dialogGuardar = {
        title: 'Guardar',
        message: 'El profesional ha sido guardado correctamente.',
        btnCancelar: 'false',
        type: 'G',
        navigate: '/list-doctors'
      };
      this.dialogError = {
        title: 'Error',
        message: 'Error al intentar guardar el profesional.',
        btnCancelar: 'false',
        type: 'E'
      };
      this.dialogDuplicado = {
        title: 'Error',
        message: 'El profesional que intenta guardar ya se encuentra registrado.',
        btnCancelar: 'false',
        type: 'E'
      };
      this.dialogConfirm = {
        title: 'Confirmar',
        message: '¿Está seguro de que desea borrar este registro?.',
        btnCancelar: 'true',
        type: 'C'
      };

    }

    openDialog(config : any){
        const dialogRef = this.dialog.open(DialogComponent, { data: {
          title: config.title,
          message: config.message,
          btnCancelar: config.btnCancelar,
        }});
        dialogRef.afterClosed().subscribe(result => {
          if(config.type != 'E' && config.navigate){
            this._router.navigate([config.navigate]);
          };
          if(config.type == 'C'){
            if(result == 'true'){
              return true;
            }else if(result == 'false'){
              return false;
            }
          };

        });
      }

    



}
