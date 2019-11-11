import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private nomeFondo = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ valore: number; nameFondo: string; data: number ; descrizione:string, addAcc: string }> = [];
  constructor() {
    
    this.items.push({
      valore: 23,
      nameFondo: "Svago",
      data: 1572517937572,
      descrizione: "Test 5",
      addAcc :"D"
    });
    this.items.push({
      valore: 53,
      nameFondo: "Cassa",
      data: 1572517937572,
      descrizione: "Test 4",
      addAcc :"C"
    });
    this.items.push({
      valore: 123,
      nameFondo: "Necessita",
      data: 1572517937572,
      descrizione: "Test 3",
      addAcc :"D"
    });
    this.items.push({
      valore: 42,
      nameFondo: "Necessità",
      data: 1572517937572,
      descrizione: "Test 2",
      addAcc :"D"
    });
    this.items.push({
      valore: 1512,
      nameFondo: "Ripartiti",
      data: 1572517937572,
      descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod diam accumsan massa efficitur sodales. Quisque iaculis venenatis est, nec vulputate neque ornare et. Sed rutrum libero vel lectus rutrum ullamcorper a sit amet quam. ",
      addAcc :"C"
    });this.items.push({
      valore: 23,
      nameFondo: "Svago",
      data: 1572517937572,
      descrizione: "Test 5",
      addAcc :"D"
    });
    this.items.push({
      valore: 53,
      nameFondo: "Cassa",
      data: 1572517937572,
      descrizione: "Test 4",
      addAcc :"C"
    });
    this.items.push({
      valore: 123,
      nameFondo: "Necessita",
      data: 1572517937572,
      descrizione: "Test 3",
      addAcc :"D"
    });
    this.items.push({
      valore: 42,
      nameFondo: "Necessità",
      data: 1572517937572,
      descrizione: "Test 2",
      addAcc :"D"
    });
    this.items.push({
      valore: 1512,
      nameFondo: "Ripartiti",
      data: 1572517937572,
      descrizione: "Questa è una descrizione standard di media lunghezza",
      addAcc :"C"
    });

  }

  ngOnInit() {

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
