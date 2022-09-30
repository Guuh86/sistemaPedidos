import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CozinhaPageRoutingModule } from './cozinha-routing.module';

import { CozinhaPage } from './cozinha.page';
import { PedidoPage } from 'src/app/modal/pedido/pedido.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CozinhaPageRoutingModule
  ],
  declarations: [CozinhaPage]
})
export class CozinhaPageModule {}
