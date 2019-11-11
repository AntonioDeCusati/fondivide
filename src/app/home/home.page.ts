import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fondo } from '../model/fondo.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  fondo: any;
  fondi: Observable<HttpResponse<Fondo[]>>;
  fondiMap: HttpResponse<Fondo[]>;
  constructor(private http: HttpClient, private modalController: ModalController) { }


  ngOnInit() {

    this.loadFondi();

  }

  loadFondi() {
    this.fondi = this.getFondi("https://www.antoniodecusati.it/connDb/project/fondivide/api/getAllFondi.php");
    this.fondi.subscribe((res) => this.fondiMap = res);
  }

  getFondi(url): Observable<HttpResponse<Fondo[]>> {
    // now returns an Observable of Config
    var headersProp = new HttpHeaders();
    headersProp.append('Access-Control-Allow-Origin' , '*');
    headersProp.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headersProp.append('Accept','application/json');
    headersProp.append('content-type','application/json');
    return this.http.get<HttpResponse<Fondo[]>>(url, {headers: headersProp});
  }



  async openModal(item) {

    console.log("Item: ", item);
    const modal = await this.modalController.create({
      component: TodoModalComponent,
      componentProps: {
        data: item
      }

    })
    await modal.present();
    modal.onDidDismiss().then(() => { this.loadFondi() });
  }

}
