import { Component, Inject  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material';

@Component({
    templateUrl: 'dialog.component.html'
})
export class DialogComponent
{
  title  = '';
  message  = '';
  btnCancelar = 'false';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.title = data.title;
      this.message = data.message;
      this.btnCancelar = data.btnCancelar;
    }
}
