import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Doctor, PersonDropdown } from 'src/app/model';

@Component({
  selector: 'app-create-or-edit-doctor',
  templateUrl: './create-or-edit-doctor.component.html',
  styleUrls: ['./create-or-edit-doctor.component.css']
})
export class CreateOrEditDoctorComponent implements OnInit{
@Output() onClose : EventEmitter<boolean>= new EventEmitter();
doctor = new Doctor();

personList!: PersonDropdown[];
doctorId!: number;
constructor(
  public bsModalRef: BsModalRef,
  private doctorService: DoctorService
) { }

  ngOnInit(): void {
    this.doctorService.getDoctorById(this.doctorId).subscribe(result => {
      this.doctor = result;
    })
    this.getPersonForDropdownData();
  }

  save(): void {

    if (this.doctor.doctorId == undefined) {
      this.doctor.doctorId = 0;
      
      this.doctorService.createDoctor(this.doctor).subscribe(() => {
        this.bsModalRef.hide();
        this.onClose.emit(true);
      },
        error => {
          console.error('Error saving person:', error);
          this.bsModalRef.hide();
          this.onClose.emit(false);
        }
      );
    }
    else {
      this.doctorService.updateDoctor(this.doctor).subscribe(() => {
          this.bsModalRef.hide();
          this.onClose.emit(true);
        },
        error => {
          console.error('Error saving person:', error);
          this.bsModalRef.hide();
          this.onClose.emit(false);   
        }
      );
    }
  }

    getPersonForDropdownData() {debugger
      this.doctorService.getPersonForDropdown().subscribe(result => {
        this.personList = result;
      });
    }
}