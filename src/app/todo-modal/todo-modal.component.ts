import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { Fondo } from '../model/fondo.model';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
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
  fondi: Observable<HttpResponse<Fondo[]>>;
  fondiMap: HttpResponse<Fondo[]>;
  itemsModal: Array<{}>;
  itemSaved = {};

  idFondo: number;
  descrizione: string;
  valore: number;
  saldoDaRipartire: number;
  categoria: string;
  sottocategoria: string;
  luogo: string;
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
    } else {
      this.title = "Debito"
    }

  }

  loadFondiId() {
    this.fondi = this.getFondi(this.urlGetFondo);
    this.fondi.subscribe((res) => this.fondiMap = res);
  }

  getFondi(url): Observable<HttpResponse<Fondo[]>> {
    // now returns an Observable of Config
    return this.http.get<HttpResponse<Fondo[]>>(url);
  }

  addCredito(movimento : Movimento): Observable<HttpResponse<Movimento>> {
    console.log("Dio cane: " , movimento);
    let  headers = new Headers({ 'Access-Control-Allow-Origin': '*'});
    headers.append('Access Control Allow MethodAccess Control Allow Methods','GET,POST');
    let options = new RequestOptions({headers : headers});
    return this.http.post<HttpResponse<Movimento>>(this.urlAddAccredito,JSON.stringify(movimento)); 
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
    this.movimento.data = this.date;

    console.log("Movimento: ", this.movimento);
    var res = this.addCredito(this.movimento);
    //res.subscribe((res) => console.log(res));
    this.presentToast();
    setTimeout(() => { this.modalController.dismiss() }, 2000);
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

  handleErrorObservable (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  
 
}
