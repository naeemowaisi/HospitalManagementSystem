import { Component, Inject, Injector, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from '../model';
import { CreateOrEditPersonComponent } from './create-or-edit-person/create-or-edit-person.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons!: Person[]
  name!: string;
  dateOfBirth!: Date;
  gender: number =0;
  phoneNumber!: string 
  email!: string 
  address!: string
  public responseMessage: string = '';

  constructor(public personService: PersonService, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.getPersonsData();
  }

  getPersonsData() {
    var name = this.name == undefined ? "": this.name
    var dateOfBirth = this.dateOfBirth ? this.dateOfBirth.toISOString() : "";
    var gender = this.gender || 0
    var phoneNumber = this.phoneNumber == undefined ? "": this.phoneNumber
    var email = this.email == undefined ? "": this.email
    var address = this.address == undefined ? "": this.address
    this.personService.getPersons(name, dateOfBirth, gender, phoneNumber, email, address).subscribe(result => {
      this.persons = result;
    });
  }
  createPerson(id?: number): void {
    let modalRef: BsModalRef;

    modalRef = this.modalService.show(
      CreateOrEditPersonComponent, {
      class: 'modal-lg',
      initialState: {
        personId: id
      },
    }
    );
    modalRef.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        this.getPersonsData();
      }
    });
  }
  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe({
      next: (response: string) => {
        this.responseMessage = response;
        if(this.responseMessage!=""){
          Swal.fire({
            title: 'Failed!',
            html: `<div style="font-size: 60px;">🖕</div><p>${this.responseMessage}</p>`,
            showConfirmButton: true,
            confirmButtonText: 'Ok'
          });          
          return;
        }
        Swal.fire({
          title: 'Success!',
          text: `Deleted Successfully`,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      this.getPersonsData();
      }
    })
  }
}
