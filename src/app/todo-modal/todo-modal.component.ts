import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { Fondo } from '../model/fondo.model';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { RequestOptions, Headers , Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Movimento } from '../model/movimento.model';


@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {

  private urlGetFondo = "http://www.antoniodecusati.it/connDb/project/fondivide/api/getAllFondi.php";
  private urlAddAccredito = "http://www.antoniodecusati.it/connDb/project/fondivide/api/addMovimentoAccredito.php";
  @Input() data: any;
  movimento: Movimento;
  title: string;
  content: any;
  fondo: any;
  fondi: any;//Observable<HttpResponse<Fondo[]>>;
  fondiMap: any;//HttpResponse<Fondo[]>;
  itemsModal: Array<{}>;
  itemSaved = {};

  idFondo: number;
  descrizione: string;
  valore: number;
  saldoDaRipartire: number;
  categoria: string;
  sottocategoria: string;
  luogo: string;
  date: number;

  

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
    } else {
      this.title = "Debito"
    }

  }

  loadFondiId() {
    this.fondi = this.getFondi(this.urlGetFondo);
    this.fondi.subscribe((res) => this.fondiMap = res);
  }

  getFondi(url): any {
    // now returns an Observable of Config
    return this.http.get(url);
  }

  addCredito(movimento : Movimento): any {
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});
    return this.http.post(this.urlAddAccredito,movimento,{headers : headers,observe: "body", params : { movimento : JSON.stringify(movimento)}})
      .subscribe(
      result => {
        console.log("Result : ", result);
      }
      );
  }

  save() {
    this.movimento = new Movimento;
    this.movimento.idFondo = this.idFondo;
    this.movimento.descrizione = this.descrizione;
    this.movimento.valore = this.valore;
    this.movimento.categoria = this.categoria;
    this.movimento.sottocategoria = this.sottocategoria;
    this.movimento.luogo = this.luogo;
    this.movimento.saldoDaRipartire = this.saldoDaRipartire;
   
    var d = new Date(this.date);
    var n = d.getTime();
    this.movimento.data = n;

    console.log("Movimento: ", this.movimento);
    var res = this.addCredito(this.movimento)
    //res;
    this.presentToast();
    setTimeout(() => { this.modalController.dismiss() }, 2000);
  }

  changeValue(obj){
   
    if(this.saldoDaRipartire > this.valore){
      console.log("This value: ", this.valore);
      console.log("This saldoDaRip: " , this.saldoDaRipartire);  
      console.log("Azzera saldo da ripartire")
      this.saldoDaRipartire == 0;
    }
    console.log("Obj :" , obj);
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
