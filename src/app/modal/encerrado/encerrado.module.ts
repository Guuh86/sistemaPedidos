import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncerradoPageRoutingModule } from './encerrado-routing.module';

import { EncerradoPage } from './encerrado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncerradoPageRoutingModule
  ],
  declarations: [EncerradoPage]
})
export class EncerradoPageModule {}
