import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
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
  public items: Array<{ valore: number; nameFondo: string; data: number ; descr:string, addAcc: string }> = [];
  constructor() {
    
    this.items.push({
      valore: 23,
      nameFondo: "Svago",
      data: 1572517937572,
      descr: "Test 5",
      addAcc :"D"
    });
    this.items.push({
      valore: 53,
      nameFondo: "Cassa",
      data: 1572517937572,
      descr: "Test 4",
      addAcc :"C"
    });
    this.items.push({
      valore: 123,
      nameFondo: "Necessita",
      data: 1572517937572,
      descr: "Test 3",
      addAcc :"D"
    });
    this.items.push({
      valore: 42,
      nameFondo: "Necessità",
      data: 1572517937572,
      descr: "Test 2",
      addAcc :"D"
    });
    this.items.push({
      valore: 512,
      nameFondo: "Ripartiti",
      data: 1572517937572,
      descr: "Test 1",
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
