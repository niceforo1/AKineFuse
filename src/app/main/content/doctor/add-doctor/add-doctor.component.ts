import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Professional } from '../../../models/Professional';
import { Phone } from '../../../models/Phone';
import { Address } from '../../../models/Address';
import { SocialInsurance } from '../../../models/SocialInsurance';
import { ProfessionalService } from '../../../services/professional.service';
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';

@Component({
  selector: 'app-add-doctor',
  templateUrl: 'add-doctor.component.html',
  providers: [
    ProfessionalService,
    DialogConfigComponent
  ]
})

export class AddDoctorComponent implements OnInit {
  action : string;
  title: string;
  professional : any;
  phone : Phone;
  address : Address;
  socialInsurance : SocialInsurance;
  socialInsurances : SocialInsurance[];
  id_doctor = "new";

  constructor(private _professionalService: ProfessionalService, private _router: Router, public dialogConfig: DialogConfigComponent) {
    this.professional = new Professional();
    this.action = "Guardar";
    this.title = "Agregar Licenciado";
    this.socialInsurances = new Array();
    this.professional = new Professional();
    /*PHONE*/
    this.professional.phones = new Phone();
    this.professional.phones.main = true;
    this.professional.phones.type = "Celular";
    /*ADDRESS*/
    this.professional.address = new Address();
    this.professional.address.city = "Cordoba";
    this.professional.address.state = "Cordoba";
    this.professional.address.neighborhood = "Centro";
    this.professional.address.zip = "5000";
    /*SOCIAL INSURANCE*/
    this.professional.socialInsurance = new SocialInsurance();
    this.professional.socialInsurance.name = "Swiss Medical";
    this.professional.socialInsurance.contact = '123456';
    this.professional.socialInsurance.email = 'swiss.medical@sw.com';
  }

  ngOnInit() {

  }

  onSubmit() {
    this.socialInsurances.push(this.socialInsurance);
    this.professional.socialInsurance = this.socialInsurances;
    this.saveProfessional();
  }

  saveProfessional() {
    this._professionalService.getProfessionalByDoc(this.professional.id).subscribe(data => {
      if (data) {
        this.dialogConfig.openDialog(this.dialogConfig.dialogDuplicadoDni);
      } else {
        this._professionalService.saveProfessional(this.professional).subscribe(data => {
          this.dialogConfig.openDialog(this.dialogConfig.dialogGuardarDoctor);
        },
        err => {
          this.dialogConfig.openDialog(this.dialogConfig.dialogErrorGenerico);
        });
      }
    },
    err => {
      this.dialogConfig.openDialog(this.dialogConfig.dialogErrorGenerico);
    });
  }



}
