import { IContact } from './contact.Module';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ContactService {

  private api: string = 'http://localhost:5233/api/contact/'

  constructor(private httpClient: HttpClient) { }

  public AddContact(newContact: IContact): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}`, newContact)
  }

  public ListContact() {
    return this.httpClient.get<IContact[]>(`${this.api}`)
  }

  public SearchFilter(searchFilter: String): Observable<IContact[]> {
    return this.httpClient.get<IContact[]>(`${this.api}filter/`+ searchFilter)
  }  

  public DeleteContact(idContact: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}` + idContact)
  }

  public UpdateContact(upContact: IContact): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}`, upContact)
  }

}


