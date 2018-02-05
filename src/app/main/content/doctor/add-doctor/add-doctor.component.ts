import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Professional } from '../Professional';
import { ProfessionalService } from '../../../services/professional.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: 'add-doctor.component.html',
  providers: [
    ProfessionalService
  ]
})

export class AddDoctorComponent implements OnInit {
  professional: any;
  //form: FormGroup;
  professionals: any;


  constructor(private _professionalService: ProfessionalService) {
    this.professional = new Professional();
  }

  ngOnInit() {
   
  }

  onSubmit() {
    console.log(this.professional);
  }  
}
