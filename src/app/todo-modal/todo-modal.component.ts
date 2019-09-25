import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Fondo } from '../model/fondo.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {

  @Input() data: any;
  title: string;
  content: any;
  fondo: any;
  fondi: Observable<HttpResponse<Fondo[]>>;
  fondiMap: HttpResponse<Fondo[]>;
  itemsModal: Array<{}>;
  itemSaved = {};

  idFondo: number;
  descrizione: string ;
  valore: number ;
  saldoDaRipartire: number;
  categoria: string ;
  sottocategoria: string ;
  luogo: string ;
  date: Date;


  constructor(private modalController: ModalController, private http: HttpClient, public toastController: ToastController) { }

  async close() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    console.log(this.data);
    this.loadFondiId();
    if (this.data == "C") {
      this.title = "Credito";
      //text,number,date,toogle

      this.itemsModal = [
        { 'title': 'Descrizione', 'id': 'descrizione', 'type': 'text' },
        { 'title': 'Valore', 'id': 'valore', 'type': 'number' },
        { 'title': 'Saldo da Ripartire', 'id': 'saldoDaRipartire', 'type': 'number' },
        { 'title': 'Categoria', 'id': 'categoria', 'type': 'text' },
        { 'title': 'Sottocategoria', 'id': 'sottocategoria', 'type': 'text' },
        { 'title': 'Luogo', 'id': 'luogo', 'type': 'text' },
        { 'title': 'Data', 'id': 'date', 'type': 'date' }]
    } else {
      this.title = "Debito"
    }

  }

  loadFondiId() {
    this.fondi = this.getFondi("http://www.antoniodecusati.it/connDb/project/fondivide/api/getAllFondi.php");
    this.fondi.subscribe((res) => this.fondiMap = res);
  }

  getFondi(url): Observable<HttpResponse<Fondo[]>> {
    // now returns an Observable of Config
    return this.http.get<HttpResponse<Fondo[]>>(url);
  }

  save() {
    console.log("IdFondo: ", this.idFondo);
    console.log("Desc: ", this.descrizione);
    console.log("Val: ", this.valore);
    console.log("Data: ", this.date);
    // this.presentToast();
    //setTimeout(()=>{this.modalController.dismiss() }, 2000);
  }

  

  async presentToast() {
    //posso fare il toast con l'errore impostando il colore del toast
    //danger , dark , success
    //con l'errore che facciamo? rimaniamo un pò di più il toast?
    var colorToast = 'success';
    var durationToast = 1500;
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: durationToast,
      color: colorToast
    });
    toast.present();
  }
}
