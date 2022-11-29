import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CozinhaResultPageRoutingModule } from './cozinha-result-routing.module';

import { CozinhaResultPage } from './cozinha-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CozinhaResultPageRoutingModule
  ],
  declarations: [CozinhaResultPage]
})
export class CozinhaResultPageModule {}
