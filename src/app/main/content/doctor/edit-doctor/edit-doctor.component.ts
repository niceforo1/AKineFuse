import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/* Services */
import { ProfessionalService } from '../../../services/professional.service';
/* Models */
import { Professional } from '../../../models/Professional';
import { Address } from '../../../models/Address';
import { Phone } from '../../../models/Phone';
/*Dialog*/
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: '../add-doctor/add-doctor.component.html',
  providers: [
    ProfessionalService
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
              private _activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    this.action = "Editar";
    this.title = "Editar Licenciado";
    this.message = null;
    this.messageClass = null;
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
        this.messageClass = 'alert alert-danger alert-dismissible';
        this.message = `${err.error}`
        console.log(`${err.error}`)
      });
    });
  }

  onSubmit() {
    this.message = null;
    this.saveProfessional();
  }

  saveProfessional() {
    this._professionalService.updateProfessional(this.professional, this.professional._id).subscribe(data => {
        this.messageClass = 'alert alert-success alert-dismissible';
        this.message = 'El profesional fue guardado correctamente.';
        setTimeout(() => {
          this._router.navigate(['/list-doctors']);
        }, 2000);
      },
    err => {
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = `${err.error}`
      console.log(`${err.error}`)
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
