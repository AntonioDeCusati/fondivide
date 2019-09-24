import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component ({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {

  @Input() data:any;
  title : string;
  content : any;

  constructor(private modalController: ModalController) { }

  async close(){
    await this.modalController.dismiss();
    //location.reload();
  }

  ngOnInit() {
    console.log(this.data);
    if(this.data == "A"){
      this.title = "Accredito";
    }else{
      this.title = "Debito"
    }

  }

}
