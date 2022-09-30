import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CozinhaPage } from './cozinha.page';

const routes: Routes = [
  {
    path: '',
    component: CozinhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CozinhaPageRoutingModule {}
