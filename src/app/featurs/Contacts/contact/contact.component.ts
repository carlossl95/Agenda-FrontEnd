import { ContactService } from './../contact.Service';
import { IContact } from './../contact.Module';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public form!: FormGroup;
  public formUp!: FormGroup;
  public idContact!: number;
  
  public contact: IContact[] = [];

  searcheList = new FormControl();



  constructor(private _contactService: ContactService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      company: new FormControl(null, [Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.maxLength(50)]),
      personalPhone: new FormControl(null, [Validators.maxLength(11)]),
      businessPhone: new FormControl(null, [Validators.maxLength(11)]),
    })

    this.formUp = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      company: new FormControl(null, [Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.maxLength(50)]),
      personalPhone: new FormControl(null, [Validators.maxLength(11)]),
      businessPhone: new FormControl(null, [Validators.maxLength(11)]),
    })

    this.SearchList()

  }


  ClearFilter(){
    this.SearchList()
  }

  SearchList()
  {
    this._contactService.ListContact()
      .pipe(take(1))
      .subscribe(
        (data: IContact[]) => {
          this.contact = data
        },
      )
  }

  SearchFilter() {

    this._contactService.SearchFilter(this.searcheList.value)
    .pipe(take(1))
      .subscribe(
        (data: IContact[]) => {
          this.contact = data
        },
        (status: HttpErrorResponse) => {
          alert(`${status.error.mensagem}`)
        })

  }

  ID(contact: IContact) {
    this.idContact = Number(contact.id)
    this.formUp.patchValue({
      name: contact.name,
      company: contact.company,
      email: contact.email,
      personalPhone: contact.personalPhone,
      businessPhone: contact.businessPhone
    })
  }

  UpdateContact() {
    if (this.formUp.valid) {
      var contact: IContact = {
        id: this.idContact,
        name: this.formUp.value.name,
        company: this.formUp.value.company,
        email: this.formUp.value.email,
        personalPhone: this.formUp.value.personalPhone,
        businessPhone: this.formUp.value.businessPhone
      }
      this._contactService.UpdateContact(contact)
        .pipe(take(1))
        .subscribe(
          (data: boolean) => {
            if (data != true)
              alert("Erro ao Adicionar contato")

            alert('Editado com sucesso!')
            location.reload()
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          })
    }
    else
      alert('Verificar requisitos de formulário')

  }

  AddContact() {
    if (this.form.valid) {
      var contact: IContact = {
        name: this.form.value.name,
        company: this.form.value.company,
        email: this.form.value.email,
        personalPhone: this.form.value.personalPhone,
        businessPhone: this.form.value.businessPhone
      }
      this._contactService.AddContact(contact)
        .pipe(take(1))
        .subscribe(
          (data: boolean) => {
            if (data != true)
              alert("Erro ao Adicionar contato")

            alert('Adicionado com sucesso!')
            location.reload()
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          })
    }
    else
      alert('Verificar requisitos de formulário')

  }

  Delete(contact: IContact) {
    if (confirm(`Excluir o Cliente: ${contact.name}`)) {

      this._contactService.DeleteContact(Number(contact.id))
        .pipe(take(1))
        .subscribe(
          (data: boolean) => {
            if (data != true)
              alert("Erro ao deletar contato")

            alert('Deletado com sucesso!')
            location.reload()
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          })
    }
  }

}
