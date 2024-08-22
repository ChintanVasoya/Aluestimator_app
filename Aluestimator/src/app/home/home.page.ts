import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects: any[] = [];
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    let projectData = localStorage.getItem('project');
    if (projectData) {
      this.projects = JSON.parse(projectData);
      console.log(this.projects)
    }
  }

  ngOnChange() {

  }

  editProject(project: any) {
    this.navCtrl.navigateForward('/createproject', {
      queryParams: {
        project: project
      }
    });
  }

  deleteProject(project: any) {
    let projects = localStorage.getItem('project');
    if (projects) {
      let parsedProjects = JSON.parse(projects);
      let index = parsedProjects.findIndex((p: any) => p.id === project.id);
      parsedProjects.splice(index, 1);
      localStorage.setItem('project', JSON.stringify(parsedProjects));
      this.ngOnInit();
    }
  }

  goToProject(project: any) {
    this.navCtrl.navigateForward('/projects/' + project.id);
  }

}
