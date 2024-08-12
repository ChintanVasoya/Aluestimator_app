import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'My Warehouse', url: '/folder/inbox', icon: 'library' },
    { title: 'Need help?', url: '/folder/outbox', icon: 'help' },
    { title: 'Terms & Con.', url: '/folder/favorites', icon: 'document-text' },
    { title: 'Logout', url: '/folder/archived', icon: 'log-out' },
  ];
  constructor() {}
}
