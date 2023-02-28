import { ContactComponent } from './featurs/Contacts/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "Contacts",
    children: [
      {
        path: "contact",
        component: ContactComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'Contacts/contact',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
