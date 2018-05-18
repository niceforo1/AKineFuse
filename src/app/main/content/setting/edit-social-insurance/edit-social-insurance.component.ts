import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
  selector: 'app-edit-social-insurance',
  templateUrl: '../add-social-insurance/add-social-insurance.component.html',
  providers: [
    SocialInsuranceService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class EditSocialInsuranceComponent implements OnInit {
  action: string;
  title: string;
  socialInsurance: any;
  id_socialInsurance: string;

  constructor(private _socialInsuranceService: SocialInsuranceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              public dialogConfig: DialogConfigComponent,
              public alert: AlertComponent) {
    this.action = 'Editar';
    this.title = 'Editar Obra Social';
    /*SOCIAL INSURANCE*/
    this.socialInsurance = new SocialInsurance();
    /*PHONE*/
    this.socialInsurance.phones = new Phone();
    /*ADDRESS*/
    this.socialInsurance.address = new Address();
  }

  ngOnInit() {
    this.getSocialInsurances();
  }

  onSubmit() {
    this.saveSocialInsurance();
  }

  saveSocialInsurance() {
    this._socialInsuranceService.updateSocialInsurance(this.socialInsurance, this.socialInsurance._id).subscribe(data => {
      this.alert.openSuccessSnackBar(this.alert.successSocIns);
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

  getSocialInsurances(){
    this._activatedRoute.params.forEach((params: Params)=>{
      this.id_socialInsurance = params['id'];
      this._socialInsuranceService.searchSocialInsurance(this.id_socialInsurance).subscribe(response => {
          this.socialInsurance = response;
        },
        err => {
          this.alert.openErrorSnackBar(this.alert.genericError);
        });
    });
  }
}
