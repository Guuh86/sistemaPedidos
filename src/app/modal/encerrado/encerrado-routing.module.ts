import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncerradoPage } from './encerrado.page';

const routes: Routes = [
  {
    path: '',
    component: EncerradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncerradoPageRoutingModule {}
