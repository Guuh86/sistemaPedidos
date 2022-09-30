import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaPageRoutingModule } from './consulta-routing.module';

import { ConsultaPage } from './consulta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConsultaPage]
})
export class ConsultaPageModule {}
