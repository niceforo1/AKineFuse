import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/* Services */
import { ProfessionalService } from '../../../services/professional.service';
/* Models */
import { Professional } from '../../../models/Professional';
import { Address } from '../../../models/Address';
import { Phone } from '../../../models/Phone';
/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: '../add-doctor/add-doctor.component.html',
  providers: [
    ProfessionalService,
    DialogConfigComponent
  ]
})

export class EditDoctorComponent implements OnInit {
  action : string;
  title: string;
  message : string;
  messageClass : string;
  professional : any;
  phone : Phone;
  id_doctor : string;

  constructor(private _professionalService: ProfessionalService, private _router: Router,
              private _activatedRoute: ActivatedRoute, public dialogConfig: DialogConfigComponent) {
    this.action = "Editar";
    this.title = "Editar Licenciado";
    this.professional = new Professional();
    this.professional.phones = new Phone();
    this.professional.address = new Address();
    this.id_doctor = null;
  }

  ngOnInit() {
    this.getProfessional();
  }


 getProfessional(){
    this._activatedRoute.params.forEach((params:Params)=>{
      this.id_doctor = params['id'];
      this._professionalService.searchProfessional(this.id_doctor).subscribe(response => {
        this.professional = response;
      },
      err => {
        this.dialogConfig.openDialog(this.dialogConfig.dialogErrorGenerico);
      });
    });
  }

  onSubmit() {
    this.saveProfessional();
  }

  saveProfessional() {
    this._professionalService.updateProfessional(this.professional, this.professional._id).subscribe(data => {
        this.dialogConfig.openDialog(this.dialogConfig.dialogGuardarDoctor);
      },
    err => {
        this.dialogConfig.openDialog(this.dialogConfig.dialogErrorGenerico);
    });
  }

}
