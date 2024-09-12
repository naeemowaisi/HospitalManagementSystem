import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { PersonService } from '../person.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Person } from 'src/app/model';

@Component({
  selector: 'app-create-or-edit-person',
  templateUrl: './create-or-edit-person.component.html',
  styleUrls: ['./create-or-edit-person.component.css']
})
export class CreateOrEditPersonComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  person = new Person();
  personId!: number;
  gender!:number;
  constructor(
    public bsModalRef: BsModalRef,
    private personService: PersonService
  ) { }
  ngOnInit(): void {
    if (this.personId) {  
      this.personService.getPersonById(this.personId).subscribe(result => {
        this.person = result;
        this.gender = result.gender;
      })
    }
  }

  save(): void {

    if (this.person.personId == undefined) {
      this.person.personId = 0;
      this.person.gender = Number(this.gender);
      this.personService.createPerson(this.person).subscribe(() => {
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
      this.person.gender = Number(this.gender); 
      this.personService.updatePerson(this.person).subscribe(() => {
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
}