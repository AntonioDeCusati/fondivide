import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { Fondo } from '../model/fondo.model';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Movimento } from '../model/movimento.model';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {

  private urlGetFondo = 'https://www.antoniodecusati.it/connDb/project/fondivide/api/getAllFondi.php';
  private urlAddAccredito = 'https://www.antoniodecusati.it/connDb/project/fondivide/api/addMovimentoAccredito.php';
  private urlAddAddebito = 'https://www.antoniodecusati.it/connDb/project/fondivide/api/addMovimentoAddebito.php';
  
  @Input() data: any;
  movimento: Movimento;
  title: string;
  content: any;
  fondo: any;
  fondi: any; // Observable<HttpResponse<Fondo[]>>;
  fondiMap: any; // HttpResponse<Fondo[]>;
  itemsModal: Array<{}>;
  itemSaved = {};
  saldoBooleanTrue = false;
  saldoErrorClass = false;

  idFondo: any;
  descrizione: string;
  valore: number;
  saldoDaRipartire: number;
  categoria: string;
  sottocategoria: string;
  luogo: string;
  date: number;

  arrotondamento= false;
  saldoArrotond : number;

  headersProp : HttpHeaders;



  constructor(private modalController: ModalController, private http: HttpClient, public toastController: ToastController) { }

  async close() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    
    this.headersProp.append('Access-Control-Allow-Origin' , '*');
    this.headersProp.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headersProp.append('Accept','application/json');
    this.headersProp.append('content-type','application/json');
    this.headersProp.append('Access Control Allow MethodAccess Control Allow Methods', '*');
    console.debug(this.data);
    this.loadFondiId();
    this.refreshVisibility();
    if (this.data === 'C') {
      this.title = 'Credito';
      // text,number,date,toogle
    } else {
      this.title = 'Debito';
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

  addCredito(movimento: Movimento): any {
    const headers = this.headersProp;
    
    return this.http.post(this.urlAddAccredito, movimento, {
      headers, params: { movimento: JSON.stringify(movimento) },
      responseType: 'json'
    }).subscribe(
      data => {
        console.debug('POST Request is successful ', data);
      },
      error => {
        console.debug('Error POST : ', error);
      }
    );
  }
  
  addAddebito(movimento: Movimento): any {
    const headers = this.headersProp;
    headers.append('Access Control Allow MethodAccess Control Allow Methods', '*');
    return this.http.post(this.urlAddAddebito, movimento, {
      headers, params: { movimento: JSON.stringify(movimento) },
      responseType: 'json'
    }).subscribe(
      data => {
        console.debug('POST Request is successful ', data);
      },
      error => {
        console.debug('Error POST : ', error);
      }
    );
  }
  
  save() {
    console.log(this.data);
    if(this.data == "C"){ 
      this.movimento = new Movimento;
      this.movimento.idFondo = this.idFondo;
      this.movimento.descrizione = this.descrizione;
      this.movimento.valore = this.valore;
      this.movimento.categoria = this.categoria;
      this.movimento.sottocategoria = this.sottocategoria;
      this.movimento.luogo = this.luogo;
      this.movimento.saldoDaRipartire = this.saldoDaRipartire;
  
      const d = new Date(this.date);
      const n = d.getTime();
      this.movimento.data = n;
  
      console.debug('Movimento: ', this.movimento);
      const res = this.addCredito(this.movimento);
      // res; TODO gestire response
      this.presentToast('success',1500,'Your settings have been saved.');
      setTimeout(() => { this.modalController.dismiss(); }, 2000);
    } else {
      
      //qui
      this.movimento = new Movimento;
      this.movimento.idFondo = this.idFondo;
      this.movimento.descrizione = this.descrizione;
      this.movimento.valore = this.valore;
      this.movimento.categoria = this.categoria;
      this.movimento.luogo = this.luogo;
      this.movimento.arrotondamento= this.arrotondamento;
      this.movimento.saldoArrotond=this.saldoArrotond;

  
      const d = new Date(this.date);
      const nD = d.getTime();
      this.movimento.data = nD;
  
      console.debug('Movimento: ', this.movimento);
      const res = this.addAddebito(this.movimento);
        // res; TODO gestire response
      this.presentToast('success',1500,'Your settings have been saved.');
      setTimeout(() => { this.modalController.dismiss(); }, 2000);
    }
    
  }

  refreshVisibility() {
    console.debug("IDFONDO :", this.idFondo);
    if( this.idFondo === undefined || this.idFondo == "null" ){
      this.saldoBooleanTrue = true;
    } else{
      this.saldoBooleanTrue = false;
    }
  }

  refreshVisibilityFromValue(){
    console.debug("valore :", this.valore);
    console.debug("saldoDaRipartire :", this.saldoDaRipartire);
    if (this.valore && (this.saldoDaRipartire > this.valore) ){
      this.presentToast('danger',2000,'Saldo da ripartire maggiore del valore inserite');
      this.saldoDaRipartire = null;
      this.saldoErrorClass = true;
    } else {
      if(this.saldoDaRipartire != null){
      this.saldoErrorClass = false;
      }
    }
  }

  async presentToast(color,duration,message) {
    // posso fare il toast con l'errore impostando il colore del toast
    // danger , dark , success
    // con l'errore che facciamo? rimaniamo un pò di più il toast?
    const colorToast = color ? color : 'warning';
    const durationToast = duration ? duration : 1200;
    const messageToast = message ? message : "Generic Error";
    const toast = await this.toastController.create({
      message: messageToast,
      duration: durationToast,
      color: colorToast
    });
    toast.present();
  }


  logElements(obj){
    console.debug(obj);
  }
}
