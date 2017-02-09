import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ColaboradorDetailComponent } from './colaboradores/colaborador-detail.component';
import { ColaboradorAddComponent } from './colaboradores/colaborador-add.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'colaboradores/detail/:id', component: ColaboradorDetailComponent },
  { path: 'colaboradores/add', component: ColaboradorAddComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

