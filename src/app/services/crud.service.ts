import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  dbName = 'Pedidos';
  dbClosed = 'Encerrados';

  constructor(
    private db: AngularFirestore
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

  delete(id) {
    this.db.doc(this.dbName + '/' + id).delete();
  }

  createClosed(doc, product){
    return this.db.collection(this.dbClosed).doc(doc).set(product);
  }

  readClosed(){
    return this.db.collection(this.dbClosed).snapshotChanges();
  }

}
