import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Produto } from '../interfaces/produto';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Status } from '../interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  statusRef !: AngularFireList<any>;
  statRef !: AngularFireObject<any>;

  dbName = 'Pedidos';

  constructor(
    private db: AngularFirestore,
    private realtime: AngularFireDatabase
  ) { }

  create(product, doc) {
    return this.db.collection(this.dbName).doc(doc).set(product);
  }

  read() {
    return this.db.collection(this.dbName).snapshotChanges();
  }

  get(cpf) {
    return this.db.collection(this.dbName).doc<Produto>(cpf).valueChanges();
  }

  update(productID, product) {
    this.db.doc(this.dbName + '/' + productID).update(product);
  }

  delete(product_ID) {
    this.db.doc(this.dbName + '/' + product_ID).delete();
  }

  createStatus(item: Status){
    this.statusRef.push(item);
  }

  getStatus(id: any){
    this.statRef = this.realtime.object('Status/' + id);
    return this.statRef
  }

  getAllStatus(){
    this.statusRef = this.realtime.list('Status/');
    return this.statusRef;
  }

  updateStatus(id: any, item: Status){
    this.statRef.update(item);
  }

  deleteStatus(id: any){
    this.statRef = this.realtime.object('Status/' + id);
    this.statRef.remove();
  }



}
