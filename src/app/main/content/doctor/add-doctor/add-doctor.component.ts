import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Professional } from '../../../models/Professional';
import { Phone } from '../../../models/Phone';
import { Address } from '../../../models/Address';
import { SocialInsurance } from '../../../models/SocialInsurance';
import { ProfessionalService } from '../../../services/professional.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-add-doctor',
  templateUrl: 'add-doctor.component.html',
  providers: [
    ProfessionalService
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
  dialogError : any;
  dialogGuardar : any;
  dialogDuplicado : any;

  constructor(private _professionalService: ProfessionalService, private _router: Router, public dialog: MatDialog) {
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
        this.openDialog(this.dialogDuplicado);
      } else {
        this._professionalService.saveProfessional(this.professional).subscribe(data => {
            this.openDialog(this.dialogGuardar);
        },
        err => {
          this.openDialog(this.dialogError);
        });
      }
    },
    err => {
      this.openDialog(this.dialogError);
    });
  }

  openDialog(config : any){
      const dialogRef = this.dialog.open(DialogComponent, { data: {
        title: config.title,
        message: config.message,
        btnCancelar: config.btnCancelar,
      }});
      dialogRef.afterClosed().subscribe(result => {
        if(config.type != 'E'){
            this._router.navigate([config.navigate]);
        }
      });
    }

}
