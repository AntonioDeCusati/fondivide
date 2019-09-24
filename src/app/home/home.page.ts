import { Component, OnInit } from '@angular/core';
import { Fondo } from '../model/fondo.model';
import { ConfigService } from '../config/config.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fondo : any;
  request  : ConfigService;
  fondi: Observable<HttpResponse<Fondo[]>>;
  
  fondiMap: HttpResponse<Fondo[]>;
  constructor(private http: HttpClient, private modalController: ModalController){ }


  ngOnInit() {
   
   this.fondi = this.getFondi("http://www.antoniodecusati.it/connDb/project/fondivide/api/getAllFondi.php");
   this.fondi.subscribe((res) => this.fondiMap = res);
  }
  

  getFondi(url) : Observable<HttpResponse<Fondo[]>> {
    // now returns an Observable of Config
    return this.http.get<HttpResponse<Fondo[]>>(url);
  }

  addDebito(){
    this.openModal("D"); 
  }
  addAccredito(){
    this.openModal("A");
  }

  
  async openModal(item){
    let title = "";
    if(item = "A"){
      title = "Accredito";
    }else{
      title = "Debito"
    }
    const modal = await this.modalController.create({
      component: TodoModalComponent,
      componentProps: {
        data: title,
        type:item
      }

    })
    await modal.present();
  }

}
