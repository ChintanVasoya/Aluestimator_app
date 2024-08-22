import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  constructor(public router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController
  ) { }
  isEditable: boolean = false;
  project: {
    id: number,
    name: string,
    clientName: string,
    address: string,
    city: string,
    number: string,
    coating: string,
    sheet: string,
    glass: string,
    type: String,
    comments: string
  } = {
      id: 1,
      name: '',
      clientName: '',
      address: '',
      city: '',
      number: '',
      coating: '',
      sheet: '',
      glass: '',
      type: '',
      comments: ''
    }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['project']) {
        this.project = params['project'];
        this.isEditable = true;
      }
    });
  }

  save() {
    let projectData = localStorage.getItem('project');
    if (projectData) {
      let projects = JSON.parse(projectData);
      if (this.isEditable) {
        let index = projects.findIndex((p: any) => p.id === this.project.id);
        projects[index] = this.project;
      } else {
        this.project.id = projects.length + 2;
        projects.push(this.project);
      }
      localStorage.setItem('project', JSON.stringify(projects));
    } else {
      let projects = [];
      projects.push(this.project);
      localStorage.setItem('project', JSON.stringify(projects));
    }
    this.project = {
      id: 0,
      name: '',
      clientName: '',
      address: '',
      city: '',
      number: '',
      coating: '',
      sheet: '',
      glass: '',
      type: '',
      comments: ''
    };
    this.navCtrl.back();
  }

}
