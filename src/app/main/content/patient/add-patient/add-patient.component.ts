import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
/* Services */
import {PatientService} from '../../../services/patient.service';
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
import {LocationService} from '../../../services/location.service';
/* Models */
import {Patient} from '../../../models/patient';
import {PatientSocialInsurance} from '../../../models/patientSocialInsurance';
import {Address} from '../../../models/Address';
import {Phone} from '../../../models/Phone';
import {SocialInsurance} from '../../../models/SocialInsurance';
/*Dialog*/
import { DialogConfigComponent }from '../../dialog/dialogConfig.component';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  providers: [
    PatientService,
    SocialInsuranceService,
    LocationService,
    DialogConfigComponent
  ]
})

export class AddPatientComponent implements OnInit {
  action: string;
  title: string;
  message: string;
  messageClass: string;
  patient: any;
  socialInsurances: any;
  socialInsurance: any;
  id_patient = "new";
  province: any;
  provinces:any;
  cities:any;

  constructor(private _patientService: PatientService, private _socialInsuranceService: SocialInsuranceService,
              private _locationService:LocationService, private _router: Router, private _activatedRoute: ActivatedRoute,
              private dialog : DialogConfigComponent) {
    this.action = 'Guardar';
    this.title = 'Agregar Paciente';
    this.patient = new Patient();
    this.patient.socialInsurance = new PatientSocialInsurance();
    /*PHONE*/
    this.patient.phones = new Phone();
    this.patient.phones.main = true;
    this.patient.phones.type = 'Celular';
    /*ADDRESS*/
    this.patient.address = new Address();
    /*SOCIAL INSURANCE*/
    this.socialInsurances = new Array();
    this.socialInsurance = new PatientSocialInsurance();
  }

  ngOnInit() {
    this.getSocialInsurances();
    this.getProvinces();
  }

  onSubmit() {
    this.savePatient();
  }

  onChange(){
    this._locationService.getCities(this.province).subscribe(data => {
      this.patient.address.state = this.province;
      this.cities = data[0].localidad;
    },
    err => {
      this.dialog.openDialog(this.dialog.dialogErrorGenerico);
    })

  }

  savePatient() {
    this._patientService.getPatientByDoc(this.patient.id).subscribe(data => {
      if (data) {
        this.dialog.openDialog(this.dialog.dialogDuplicadoDni);
      } else {
        this._patientService.savePatient(this.patient).subscribe(data => {
          this.dialog.openDialog(this.dialog.dialogGuardarPatient);
        });
      }
    },
    err => {
      this.dialog.openDialog(this.dialog.dialogErrorGenerico);
    });
  }

  getSocialInsurances() {
    this._socialInsuranceService.getSocialInsurance().subscribe(response => {
      this.socialInsurances = response;
    },
    err => {
      this.dialog.openDialog(this.dialog.dialogErrorGenerico);
    });
  }
  getProvinces(){
    this._locationService.getProvinces().subscribe(data => {
      this.provinces = data;
    },
    err => {
      this.dialog.openDialog(this.dialog.dialogErrorGenerico);
    });
  }
}
