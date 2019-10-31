import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Lista Movimenti',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Home Old',
      url: '/home_old',
      icon: 'home'
    },

    {
      title: 'Todo List',
      url: '/todo-list',
      icon: 'checkbox-outline'
    },
    {
      title: 'Single Image View',
      url: '/single-image-view',
      icon: 'list-box'
    },
    {
      title: 'Messenger',
      url: '/messenger',
      icon: 'chatboxes'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
