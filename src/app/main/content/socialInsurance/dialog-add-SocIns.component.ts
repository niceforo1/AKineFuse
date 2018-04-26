import { Component, Inject  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material';
import { SocialInsurance } from '../../models/SocialInsurance';

@Component({
    templateUrl: './add-socialInsurance-dialog.component.html'
})
export class DialogComponentSocIns
{
  title  = '';
  socialInsurance = new SocialInsurance();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.title = data.title;
    }
}
