import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-window',
  templateUrl: './window.page.html',
  styleUrls: ['./window.page.scss'],
})
export class WindowPage implements OnInit {
  constructor(public router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController
  ) { }
  Particular_type: any;
  Tracktypes = [
    { name: '1T', type: '1T' },
    { name: '2T', type: '2T' },
    { name: '3T', type: '3T' },
    { name: '4T', type: '4T' },

  ]
  WindowTypes = [
    {
      name: 'Regular window', type: 'RW',
      subvalue: [
        { name: '3/4 Series', type: '3/4' },
        { name: '60 mm', type: '60mm' },
        { name: '2 x 1 Series', type: '2x1' },
      ]
    },
    {
      name: 'Domal Window', type: 'DW',
      subvalue: [
        { name: '22mm Domal Window', type: '22mmD' },
        { name: '27mm Domal Window', type: '27mmD' }
      ]
    },
    {
      name: 'Euro Series Window', type: 'ESW',
      subvalue: [
        { name: '25mm Euro Series', type: '25mmE' },
        { name: '29mm Euro Series', type: '29mmE' },
        { name: '32mm Euro Series', type: '32mmE' },
      ]
    },
    {
      name: 'Openable window', type: 'OW',
      subvalue: [
        { name: '3/4 Openable window', type: '3/4O' },
        { name: '60mm Openable window', type: '60mmO' },
        { name: '2 x 1 Openable window', type: '2x1O' },
        { name: 'R40 Openable window', type: 'R40O' },
        { name: 'R50 Openable window', type: 'R50O' },
      ]
    }]
  isEditable: boolean = false;
  ProjectId: any;
  window: {
    type: string,
    id: number,
    height: string,
    width: string,
    quantity: string,
    city: string,
    projectId: String,
    number: string,
    window: string,
    particulartype: string,
    track: string,
    lockType: String,
    comments: string
  } = {
      id: 1,
      height: '',
      width: '',
      quantity: '',
      city: '',
      number: '',
      window: '',
      projectId: '',
      particulartype: '',
      track: '',
      lockType: '',
      type: 'window',
      comments: ''
    }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['window']) {
        this.window = params['window'];
        this.isEditable = true;
      }
      if (params['projectId']) {
        this.ProjectId = params['projectId'];
        this.window.projectId = params['projectId'];
      }
    });
  }

  setParticular(event: any) {
    console.log(event.detail.value);
    let data = this.WindowTypes.find((type: any) => type.type == event.detail.value);
    if (data) {
      this.Particular_type = data.subvalue;
    }
  }

  save() {
    console.log('save', this.ProjectId);
    let windowData = localStorage.getItem('cutlary');
    this.window.projectId = this.ProjectId;
    if (windowData) {
      let windows = JSON.parse(windowData);
      if (this.isEditable) {
        let index = windows.findIndex((p: any) => p.id === this.window.id);
        windows[index] = this.window;
      } else {
        this.window.id = windows.length + 2;
        windows.push(this.window);
      }
      localStorage.setItem('cutlary', JSON.stringify(windows));
    } else {
      let windows = [];
      windows.push(this.window);
      localStorage.setItem('cutlary', JSON.stringify(windows));
    }
    this.window = {
      id: 0,
      height: '',
      projectId: '',
      width: '',
      quantity: '',
      city: '',
      number: '',
      window: '',
      particulartype: '',
      track: '',
      lockType: '',
      type: 'window',
      comments: ''
    };
    this.navCtrl.back();
  }

}
