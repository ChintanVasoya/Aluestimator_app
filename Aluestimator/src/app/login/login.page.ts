import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController,
    public router: Router
  ) {

  }

  ngOnInit() {
  }

  save() {
    if (this.username == "Admin" && this.password == "admin123") {
      this.router.navigate(['home']);
    }
  }
}
