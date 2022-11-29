import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CozinhaResultPage } from './cozinha-result.page';

const routes: Routes = [
  {
    path: '',
    component: CozinhaResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CozinhaResultPageRoutingModule {}
