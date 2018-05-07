import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* Services */
import { SocialInsuranceService } from '../../../services/socialInsurance.service';
/* Models */
import { SocialInsurance } from '../../../models/SocialInsurance';
import { Address } from '../../../models/Address';
import { Phone } from '../../../models/Phone';
/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-add-social-insurance',
  templateUrl: './add-social-insurance.component.html',
  providers: [
    SocialInsuranceService,
    DialogConfigComponent,
    AlertComponent
  ]
})
export class AddSocialInsuranceComponent implements OnInit {
  action: string;
  title: string;
  socialInsurance: any;
  id_socialInsurance = 'new';

  constructor(private _socialInsuranceService: SocialInsuranceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private dialog: DialogConfigComponent,
              public alert: AlertComponent  ) {
    this.action = 'Guardar';
    this.title = 'Agregar Obra Social';
    /*SOCIAL INSURANCE*/
    this.socialInsurance = new SocialInsurance();
    /*PHONE*/
    this.socialInsurance.phones = new Phone();
    this.socialInsurance.phones.main = true;
    this.socialInsurance.phones.type = 'Celular';
    /*ADDRESS*/
    this.socialInsurance.address = new Address();
     }

  ngOnInit() {
  }

  onSubmit() {
    this.saveSocialInsurance();
  }

  saveSocialInsurance() {

    this._socialInsuranceService.getSocialInsuranceByName(this.socialInsurance.name).subscribe(
      data => {
        if (data) {
          this.alert.openErrorSnackBar(this.alert.errorNameDuplicado);
        } else {
          this._socialInsuranceService.saveSocialInsurance(this.socialInsurance).subscribe(data => {
            this.alert.openSuccessSnackBar(this.alert.successSocIns);
          });
        }
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      }
    );

  }



}
